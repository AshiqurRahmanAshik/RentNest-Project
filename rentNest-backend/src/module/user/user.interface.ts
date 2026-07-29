import { UserRole } from '../../../generated/prisma/enums';

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  profileImage?: string;
}
export interface IUpdateUserPayload {
  phone?: string;
  address?: string;
  profileImage?: string;
}
