import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '../../../generated/prisma/enums';
import { categoryController } from './category.controller';

const router = Router();
router.post('/category', auth(UserRole.ADMIN), categoryController.createCategory);

export const categoryRoutes = router;
