import express from 'express';

import { paymentController } from './payment.controller';

import { auth } from '../../middlewares/auth';

import { UserRole } from '../../../generated/prisma/enums';

const router = express.Router();

router.post('/create', auth(UserRole.TENANT), paymentController.createPayment);

router.post('/confirm', paymentController.confirmPayment);

router.get('/', auth(UserRole.TENANT), paymentController.getPayments);

router.get('/:id', auth(UserRole.TENANT, UserRole.ADMIN), paymentController.getPaymentById);

export const paymentRoutes = router;
