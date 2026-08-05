import { prisma } from '../../lib/prisma';
const createPropertyIntoDB = async (landlordId, payload) => {
    const propertyAlreadyExists = await prisma.property.findFirst({
        where: {
            landlordId,
            title: payload.title,
        },
    });
    if (propertyAlreadyExists) {
        throw new Error('You have already listed this Property');
    }
    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId,
        },
        include: {
            category: true,
            reviews: true,
        },
    });
    return property;
};
const getMyPropertiesFromDB = async (landlordId) => {
    const properties = await prisma.property.findMany({
        where: {
            landlordId,
        },
        include: {
            category: true,
            reviews: true,
        },
    });
    return properties;
};
const getSinglePropertyFromDB = async (landlordId, propertyId) => {
    const property = await prisma.property.findFirstOrThrow({
        where: {
            id: propertyId,
            landlordId,
        },
        include: {
            category: true,
            rentalRequests: true,
            reviews: true,
        },
    });
    return property;
};
const updatePropertyIntoDB = async (landlordId, propertyId, payload) => {
    await prisma.property.findFirstOrThrow({
        where: {
            id: propertyId,
            landlordId,
        },
    });
    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: payload,
        include: {
            category: true,
            rentalRequests: true,
            reviews: true,
        },
    });
    return updatedProperty;
};
const deletePropertyFromDB = async (landlordId, propertyId) => {
    await prisma.property.findFirstOrThrow({
        where: {
            id: propertyId,
            landlordId,
        },
    });
    const deletedProperty = await prisma.property.delete({
        where: {
            id: propertyId,
        },
    });
    return deletedProperty;
};
const getRentalRequestsFromDB = async (landlordId) => {
    const requests = await prisma.rentalRequest.findMany({
        where: {
            property: {
                landlordId,
            },
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
    return requests;
};
const getARentalRequestFromDB = async (requestId) => {
    const request = await prisma.rentalRequest.findUnique({
        where: {
            id: requestId,
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
    return request;
};
const updateRentalRequestStatusIntoDB = async (landlordId, requestId, payload) => {
    await prisma.rentalRequest.findFirstOrThrow({
        where: {
            id: requestId,
            property: {
                landlordId,
            },
        },
    });
    const updatedRequest = await prisma.rentalRequest.update({
        where: {
            id: requestId,
        },
        data: {
            status: payload.status,
        },
    });
    return updatedRequest;
};
export const landlordService = {
    createPropertyIntoDB,
    getMyPropertiesFromDB,
    getSinglePropertyFromDB,
    updatePropertyIntoDB,
    deletePropertyFromDB,
    getRentalRequestsFromDB,
    updateRentalRequestStatusIntoDB,
    getARentalRequestFromDB,
};
