import { prisma } from '../../lib/prisma';
import { ICreateRentalRequestPayload } from './rental.interface';

const createRentalRequestIntoDB = async (tenantId: string, payload: ICreateRentalRequestPayload) => {
  const { propertyId, moveInDate, message } = payload;

  const property = await prisma.property.findUniqueOrThrow({
    where: {
      id: propertyId,
    },
  });

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
const getMyRentalRequestsFromDB = async (tenantId: string) => {
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
const getSingleRentalRequestFromDB = async (tenantId: string, requestId: string) => {
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
