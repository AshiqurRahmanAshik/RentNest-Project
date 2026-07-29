import { Router } from 'express';
import { authService } from './auth.service';
import { authController } from './auth.controller';

const router = Router();

router.post('/login', authController.loginUser);

export const authRoutes = router;
