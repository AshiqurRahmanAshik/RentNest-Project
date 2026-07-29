import { prisma } from '../../lib/prisma';
import { ICreateCategoryPayload } from './category.interface';

const createCategoryIntoDB = async (payload: ICreateCategoryPayload) => {
  const { name, description } = payload;
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (isCategoryExist) {
    throw new Error('Category already exists');
  }

  const category = await prisma.category.create({
    data: { name, description },
    include: {
      properties: true,
    },
  });
  return category;
};

export const categoryService = { createCategoryIntoDB };
