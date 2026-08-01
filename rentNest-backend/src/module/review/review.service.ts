import { prisma } from '../../lib/prisma';
import { ICreateReview } from './review.interface';

const createReviewIntoDB = async (tenantId: string, propertyId: string, payload: ICreateReview) => {
  const { rating, comment } = payload;
  const rental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: 'PAID',
    },
  });

  if (!rental) {
    throw new Error('You are not allowed to review this property');
  }
  if (rating <= 0 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  if (!comment || comment.length > 50) {
    throw new Error('Comments must be less than 50 characters');
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      tenantId_propertyId: {
        tenantId,
        propertyId,
      },
    },
  });

  if (existingReview) {
    throw new Error('You already reviewed this property');
  }
  const review = await prisma.review.create({
    data: {
      tenantId,
      propertyId,
      rating,
      comment,
    },
  });
  return review;
};

const getAllReviewsFromDB = async (propertyId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      propertyId,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return reviews;
};

const getReviewByIdFromDB = async (reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!review) {
    throw new Error('Review Not Found');
  }

  return review;
};

export const reviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getReviewByIdFromDB,
};
