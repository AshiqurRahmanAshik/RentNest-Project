import { prisma } from '../../lib/prisma';
const createRentalRequestIntoDB = async (tenantId, payload) => {
    const { propertyId, moveInDate, message } = payload;
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId,
        },
    });
    const existingRequest = await prisma.rentalRequest.findUnique({
        where: {
            tenantId_propertyId: {
                tenantId,
                propertyId,
            },
        },
    });
    if (existingRequest) {
        throw new Error('You already requested this property');
    }
    const rentalRequest = await prisma.rentalRequest.create({
        data: {
            tenantId,
            propertyId: property.id,
            moveInDate,
            message,
        },
    });
    return rentalRequest;
};
const getMyRentalRequestsFromDB = async (tenantId) => {
    const requests = await prisma.rentalRequest.findMany({
        where: {
            tenantId,
        },
        include: {
            property: {
                include: {
                    category: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return requests;
};
const getSingleRentalRequestFromDB = async (tenantId, requestId) => {
    const request = await prisma.rentalRequest.findFirstOrThrow({
        where: {
            id: requestId,
            tenantId,
        },
        include: {
            property: true,
        },
    });
    return request;
};
export const rentalService = {
    createRentalRequestIntoDB,
    getMyRentalRequestsFromDB,
    getSingleRentalRequestFromDB,
};
