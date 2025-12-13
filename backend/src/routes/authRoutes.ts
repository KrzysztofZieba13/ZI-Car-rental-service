import express, { Router } from 'express';
import * as authController from '../controllers/authController';
const router: Router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

export default router;
