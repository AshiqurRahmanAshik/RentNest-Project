import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { landlordService } from './landlord.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const payload = req.body;
  const property = await landlordService.createPropertyIntoDB(landlordId, payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Property created successfully',
    data: { property },
  });
});

const getMyProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const properties = await landlordService.getMyPropertiesFromDB(landlordId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Properties fetched successfully',
    data: { properties },
  });
});

const getSingleProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const propertyId = req.params.id as string;
  const property = await landlordService.getSinglePropertyFromDB(landlordId, propertyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Property fetched successfully',
    data: { property },
  });
});

const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const propertyId = req.params.id as string;
  const payload = req.body;
  const updatedProperty = await landlordService.updatePropertyIntoDB(landlordId, propertyId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Property updated successfully',
    data: { updatedProperty },
  });
});

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const propertyId = req.params.id as string;
  await landlordService.deletePropertyFromDB(landlordId, propertyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Property deleted successfully',
    data: null,
  });
});

const getRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const requests = await landlordService.getRentalRequestsFromDB(landlordId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rental requests fetched successfully',
    data: { requests },
  });
});

const getARentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { requestId } = req.params;
  const result = await landlordService.getARentalRequestFromDB(requestId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rental Request Fetched Succefully',
    data: result,
  });
});

const updateRentalRequestStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const requestId = req.params.requestId as string;
  const payload = req.body;
  const request = await landlordService.updateRentalRequestStatusIntoDB(landlordId, requestId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rental request updated successfully',
    data: { request },
  });
});
export const landlordController = {
  createProperty,
  getMyProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  getRentalRequests,
  updateRentalRequestStatus,
  getARentalRequest,
};
