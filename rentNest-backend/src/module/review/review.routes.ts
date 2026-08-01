import { Router } from 'express';
import { reviewController } from './review.controller';

const router = Router();

router.post('/:propertyId', reviewController.createReview);

router.get('/property/:propertyId', reviewController.getAllReviews);

router.get('/:reviewId', reviewController.getReviewByID);

export const reviewRoutes = router;

