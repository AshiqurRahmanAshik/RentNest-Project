import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authService } from './auth.service';
import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response, nextFuntion: NextFunction) => {
  const payload = req.body;
  const { accessToken, refreshToken } = await authService.loginUser(payload);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User logged in Successfully',
    data: { accessToken, refreshToken },
  });
});

export const authController = {
  loginUser,
};
