import { catchAsync } from '../../utils/catchAsync';
import { reviewService } from './review.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createReview = catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const tenantId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReviewIntoDB(tenantId, propertyId, payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Review created successfully',
        data: {
            result,
        },
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const { propertyId } = req.params;
    const result = await reviewService.getAllReviewsFromDB(propertyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Reviews retrieved successfully',
        data: result,
    });
});
const getReviewByID = catchAsync(async (req, res) => {
    const { reviewId } = req.params;
    const result = await reviewService.getReviewByIdFromDB(reviewId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Review found successfully',
        data: result,
    });
});
export const reviewController = { createReview, getAllReviews, getReviewByID };
