import { RequestStatus } from '../../../generated/prisma/enums';

export interface IProperty {
  categoryId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  rentAmount: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
  hasParking?: boolean;
  amenities?: string;
}

export interface IUpdatePropertyPayload {
  title?: string;
  description?: string;
  imageUrl?: string;
  rentAmount?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  floorNumber?: number;
  hasParking?: boolean;
  amenities?: string;
}

export interface IUpdateRentalRequestPayload {
  status: RequestStatus;
}
