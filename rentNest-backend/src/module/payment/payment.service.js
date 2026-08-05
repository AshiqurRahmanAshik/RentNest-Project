import { PaymentStatus, RequestStatus } from '../../../generated/prisma/enums';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import { initiatePayment, validatePayment } from '../../utils/payment.utils';
const createPaymentIntoDB = async (payload) => {
    const { rentalRequestId } = payload;
    //  check the rental request and payment is present or not
    const rentalRequest = await prisma.rentalRequest.findUnique({
        where: {
            id: rentalRequestId,
        },
        include: {
            property: true,
            tenant: {
                include: {
                    profile: true,
                },
            },
        },
    });
    if (!rentalRequest) {
        throw new Error('Rental request not found');
    }
    if (rentalRequest.status !== RequestStatus.APPROVED) {
        throw new Error('Payment only allowed after approval');
    }
    // check the payment is present or not
    const existingPayment = await prisma.payment.findUnique({
        where: {
            rentalRequestId,
        },
    });
    if (existingPayment) {
        throw new Error('Payment already exists');
    }
    const payment = await prisma.payment.create({
        data: {
            rentalRequestId,
            amount: rentalRequest.property.rentAmount,
            status: PaymentStatus.PROCESSING,
        },
    });
    //#endregion
    const paymentData = {
        total_amount: Number(rentalRequest.property.rentAmount),
        currency: 'BDT',
        tran_id: payment.id,
        success_url: `${config.app_url}/api/payments/confirm`,
        fail_url: `${config.app_url}/api/payments/confirm`,
        cancel_url: `${config.app_url}/api/payments/confirm`,
        product_name: rentalRequest.property.title,
        product_category: 'Rental',
        product_profile: 'general',
        cus_name: rentalRequest.tenant.profile?.name ?? 'Tenant',
        cus_email: rentalRequest.tenant.email,
        cus_phone: rentalRequest.tenant.profile?.phone ?? '01700000000',
        cus_add1: rentalRequest.tenant.profile?.address ?? 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1207',
        cus_country: 'Bangladesh',
        shipping_method: 'NO',
    };
    try {
        const sslResponse = await initiatePayment(paymentData);
        return {
            payment,
            sslResponse,
        };
    }
    catch (error) {
        await prisma.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: PaymentStatus.FAILED,
            },
        });
        throw error;
    }
};
const confirmPaymentIntoDB = async (payload) => {
    const { tran_id, val_id } = payload;
    const payment = await prisma.payment.findUnique({
        where: {
            id: tran_id,
        },
    });
    if (!payment) {
        throw new Error('Payment not found');
    }
    // SSLCommerz verify
    const validation = await validatePayment(val_id);
    console.log('VALIDATION RESPONSE:', validation);
    let paymentStatus;
    if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
        paymentStatus = PaymentStatus.SUCCESS;
    }
    else if (validation.status === 'FAILED') {
        paymentStatus = PaymentStatus.FAILED;
    }
    else {
        paymentStatus = PaymentStatus.CANCELLED;
    }
    const updatedPayment = await prisma.payment.update({
        where: {
            id: tran_id,
        },
        data: {
            status: paymentStatus,
        },
    });
    if (paymentStatus === PaymentStatus.SUCCESS) {
        await prisma.rentalRequest.update({
            where: {
                id: payment.rentalRequestId,
            },
            data: {
                status: RequestStatus.PAID,
            },
        });
    }
    return updatedPayment;
};
const getPaymentsFromDB = async (userId) => {
    return prisma.payment.findMany({
        where: {
            rentalRequest: {
                tenantId: userId,
            },
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
const getPaymentByIdFromDB = async (id) => {
    const payment = await prisma.payment.findUnique({
        where: {
            id,
        },
        include: {
            rentalRequest: {
                include: {
                    property: true,
                    tenant: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
        },
    });
    if (!payment) {
        throw new Error('Payment not found');
    }
    return payment;
};
export const paymentService = {
    createPaymentIntoDB,
    confirmPaymentIntoDB,
    getPaymentsFromDB,
    getPaymentByIdFromDB,
};
