import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { categoryService } from './category.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await categoryService.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Categories fetched successfully',
    data: {
      categories,
    },
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await categoryService.getSingleCategoryFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category fetched successfully',
    data: {
      category,
    },
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const category = await categoryService.updateCategoryInDB(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: {
      category,
    },
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await categoryService.deleteCategoryFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    data: null,
  });
});
export const categoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
