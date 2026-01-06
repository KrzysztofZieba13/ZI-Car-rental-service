import express, { Router } from 'express';
import {upload} from "../middleware/multer";
import {create} from "../controllers/carController";

const router: Router = express.Router();

router.post('/', upload.array('image', 10), create);

export default router;
