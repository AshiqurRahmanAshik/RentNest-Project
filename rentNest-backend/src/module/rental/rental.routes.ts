import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../../generated/prisma/enums';
import { rentalController } from './rental.controller';

const router = Router();

router.post('/', auth(UserRole.TENANT), rentalController.createRentalRequest);

router.get('/', auth(UserRole.TENANT), rentalController.getMyRentalRequests);

router.get('/:id', auth(UserRole.TENANT), rentalController.getSingleRentalRequest);

export const rentalRoutes = router;
