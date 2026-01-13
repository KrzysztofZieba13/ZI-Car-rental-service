import express, { Router } from 'express';
import * as authController from '../controllers/authController';
const router: Router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/refresh-token', authController.refreshToken)
router.get('/logout', authController.logout)

router.get('/me', authController.protect, authController.getMe)

export default router;
