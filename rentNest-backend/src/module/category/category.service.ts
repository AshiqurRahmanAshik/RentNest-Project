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

const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    include: {
      properties: true,
    },
  });

  return categories;
};

const getSingleCategoryFromDB = async (categoryId: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },

    include: {
      properties: true,
    },
  });

  return category;
};

const updateCategoryInDB = async (categoryId: string, payload: ICreateCategoryPayload) => {
  const { name, description } = payload;
  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },

    data: { name, description },
  });

  return updatedCategory;
};

const deleteCategoryFromDB = async (categoryId: string) => {
  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return deletedCategory;
};
export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
