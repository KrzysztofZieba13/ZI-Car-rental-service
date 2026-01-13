import express, { Router } from 'express';
import {upload} from "../middleware/multer";
import {create, deleteOne, getAll, getOne, updateOne} from "../controllers/carController";

const router: Router = express.Router();

router.post('/', upload.array('image', 10), create);
router.put('/:id', upload.array('image', 10), updateOne);
router.get('/', getAll);
router.get('/:id', getOne);
router.delete('/:id', deleteOne);

export default router;
