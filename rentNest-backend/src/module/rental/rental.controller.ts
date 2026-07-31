import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { rentalService } from './rental.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;

  const request = await rentalService.createRentalRequestIntoDB(tenantId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Rental request submitted successfully',
    data: {
      request,
    },
  });
});

const getMyRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;

  const requests = await rentalService.getMyRentalRequestsFromDB(tenantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rental requests fetched successfully',
    data: {
      requests,
    },
  });
});

const getSingleRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;

  const request = await rentalService.getSingleRentalRequestFromDB(tenantId, req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rental request fetched successfully',
    data: {
      request,
    },
  });
});

export const rentalController = {
  createRentalRequest,
  getMyRentalRequests,
  getSingleRentalRequest,
};
