import { Request, Response } from 'express';

import { paymentService } from './payment.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.createPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: 'Payment created successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  console.log('SSL CALLBACK DATA:', req.body);

  const result = await paymentService.confirmPaymentIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'Payment confirmed successfully',
    data: result,
  });
});

const getPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getPaymentsFromDB(req.user?.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: 'Payments retrieved successfully',
    data: result,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getPaymentByIdFromDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

export const paymentController = {
  createPayment,
  confirmPayment,
  getPayments,
  getPaymentById,
};
