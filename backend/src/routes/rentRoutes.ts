import express, { Router } from 'express';
import {create, getAll} from '../controllers/rentController';
import {protect} from "../controllers/authController";


const router: Router = express.Router();

router.post('/create', protect, create);
router.get('/getAll', protect, getAll);

export default router;
