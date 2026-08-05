import { catchAsync } from '../../utils/catchAsync';
import { rentalService } from './rental.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createRentalRequest = catchAsync(async (req, res, next) => {
    const tenantId = req.user?.id;
    const request = await rentalService.createRentalRequestIntoDB(tenantId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Rental request submitted successfully',
        data: {
            request,
        },
    });
});
const getMyRentalRequests = catchAsync(async (req, res, next) => {
    const tenantId = req.user?.id;
    const requests = await rentalService.getMyRentalRequestsFromDB(tenantId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Rental requests fetched successfully',
        data: {
            requests,
        },
    });
});
const getSingleRentalRequest = catchAsync(async (req, res, next) => {
    const tenantId = req.user?.id;
    const request = await rentalService.getSingleRentalRequestFromDB(tenantId, req.params.id);
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
