import { prisma } from '../../lib/prisma';
import {
  IProperty,
  IUpdatePropertyPayload,
  IUpdateRentalRequestPayload,
} from './landlord.interface';

const createPropertyIntoDB = async (landlordId: string, payload: IProperty) => {
  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
    include: {
      category: true,
    },
  });
  return property;
};

const getMyPropertiesFromDB = async (landlordId: string) => {
  const properties = await prisma.property.findMany({
    where: {
      landlordId,
    },

    include: {
      category: true,
    },
  });

  return properties;
};

const getSinglePropertyFromDB = async (landlordId: string, propertyId: string) => {
  const property = await prisma.property.findFirstOrThrow({
    where: {
      id: propertyId,
      landlordId,
    },

    include: {
      category: true,
      rentalRequests: true,
    },
  });

  return property;
};

const updatePropertyIntoDB = async (
  landlordId: string,
  propertyId: string,
  payload: IUpdatePropertyPayload,
) => {
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
  });

  return updatedProperty;
};

const deletePropertyFromDB = async (landlordId: string, propertyId: string) => {
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

const getRentalRequestsFromDB = async (landlordId: string) => {
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

const updateRentalRequestStatusIntoDB = async (
  landlordId: string,
  requestId: string,
  payload: IUpdateRentalRequestPayload,
) => {
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
};
