import { RequestStatus } from '../../../generated/prisma/enums';

export interface ICreateRentalRequestPayload {
  propertyId: string;
  moveInDate: Date;
  message: string;
}

export interface IUpdateRentalRequestPayload {
  status: RequestStatus;
}
