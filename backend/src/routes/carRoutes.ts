import express, { Router } from 'express';
import {upload} from "../middleware/multer.js";
import {create, deleteOne, getAll, getOne, updateOne} from "../controllers/carController.js";
import {protect, restrictTo} from "../controllers/authController.js";

const router: Router = express.Router();

router.post('/', protect, restrictTo('admin'), upload.array('image', 10), create);
router.put('/:id', protect, restrictTo('admin'), upload.array('image', 10), updateOne);
router.get('/', protect, getAll);
router.get('/:id', protect, getOne);
router.delete('/:id', protect, restrictTo('admin'), deleteOne);

export default router;
