import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { IRegisterUserPayload, IUpdateUserPayload } from './user.interface';
import config from '../../config';
import { UserRole } from '../../../generated/prisma/enums';

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, role, phone, address, profileImage } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error('User Already Exists');
  }

  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      profile: {
        create: {
          name,
          phone,
          address,
          profileImage,
        },
      },
    },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return user;
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: userId },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return user;
};

const updateMyProfileIntoDB = async (userId: string, payload: IUpdateUserPayload) => {
  const { phone, address, profileImage } = payload;
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      profile: {
        update: {
          phone,
          address,
          profileImage,
        },
      },
    },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return updatedUser;
};
export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
  updateMyProfileIntoDB,
};
