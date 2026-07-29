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

export const categoryController = { createCategory };
