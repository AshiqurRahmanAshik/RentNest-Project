import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { IRegisterUserPayload } from './user.interface';
import config from '../../config';

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

export const userService = {
  registerUserIntoDB,
};
