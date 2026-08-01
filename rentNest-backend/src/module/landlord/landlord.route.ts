import { Router } from 'express';
import { landlordController } from './landlord.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../../generated/prisma/enums';

const router = Router();

// Property Management
router.post('/properties', auth(UserRole.LANDLORD), landlordController.createProperty);
router.get('/properties', auth(UserRole.LANDLORD), landlordController.getMyProperties);
router.get('/properties/:id', auth(UserRole.LANDLORD), landlordController.getSingleProperty);
router.patch('/properties/:id', auth(UserRole.LANDLORD), landlordController.updateProperty);
router.delete('/properties/:id', auth(UserRole.LANDLORD), landlordController.deleteProperty);

// Rental Requests
router.get('/requests', auth(UserRole.LANDLORD), landlordController.getRentalRequests);
router.get('/requests/:requestId', auth(UserRole.LANDLORD), landlordController.getARentalRequest);
router.patch('/requests/:requestId', auth(UserRole.LANDLORD), landlordController.updateRentalRequestStatus);

export const landlordRoutes = router;
