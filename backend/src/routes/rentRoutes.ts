import express, { Router } from 'express';
import {create, getAll} from '../controllers/rentController.js';
import {protect} from "../controllers/authController.js";


const router: Router = express.Router();

router.post('/create', protect, create);
router.get('/getAll', protect, getAll);

export default router;
