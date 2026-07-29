import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { userService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const user = await userService.registerUserIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User Registered Successfully',
    data: { user },
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  const verifiedToken = jwt.verify(accessToken, config.jwt_access_secret);
  if (typeof verifiedToken === 'string') {
    throw new Error(verifiedToken);
  }
  const userProfile = await userService.getMyProfileFromDB(verifiedToken.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User profile fetched successfully',
    data: { userProfile },
  });
});
export const userController = { registerUser, getMyProfile };
