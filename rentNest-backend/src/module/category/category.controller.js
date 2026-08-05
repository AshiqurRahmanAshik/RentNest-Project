import { catchAsync } from '../../utils/catchAsync';
import { categoryService } from './category.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { landlordService } from '../landlord/landlord.service';
const createCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const category = await categoryService.createCategoryIntoDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Category created successfully',
        data: {
            category,
        },
    });
});
const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await categoryService.getAllCategoriesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Categories fetched successfully',
        data: {
            categories,
        },
    });
});
const getSingleCategory = catchAsync(async (req, res, next) => {
    const category = await categoryService.getSingleCategoryFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Category fetched successfully',
        data: {
            category,
        },
    });
});
const updateCategory = catchAsync(async (req, res, next) => {
    const category = await categoryService.updateCategoryInDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Category updated successfully',
        data: {
            category,
        },
    });
});
const deleteCategory = catchAsync(async (req, res, next) => {
    await categoryService.deleteCategoryFromDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Category deleted successfully',
        data: null,
    });
});
const updateRentalRequest = catchAsync(async (req, res, next) => {
    const landlordId = req.user?.id;
    const { requestId } = req.params;
    const payload = req.body;
    const result = await landlordService.updateRentalRequestStatusIntoDB(landlordId, requestId, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Rental Request Status Updated',
        data: result,
    });
});
export const categoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
