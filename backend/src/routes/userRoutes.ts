import express, { Router } from 'express';
import * as authController from '../controllers/authController';
const router: Router = express.Router();

router.post('/signup', authController.signup);

export default router;
