import { Request, Response } from 'express';
import Car from "../models/carModel";

interface MulterRequest extends Request {
    files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

export const create = async (req: Request, res: Response) => {
    try {
        const { files } = req as MulterRequest & { files: Express.Multer.File[] };

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const imagePaths = files.map(file => file.path);

        const primaryImageName = req.body.primaryImageName;
        const primaryFile = files.find(f => f.originalname === primaryImageName) || files[0];

        const newCar = new Car({
            brand: req.body.brand,
            model: req.body.model,
            transmission: req.body.transmission,
            bodyType: req.body.bodyType,
            fuelType: req.body.fuelType,
            doors: Number(req.body.doors),
            seats: Number(req.body.seats),
            primaryImage: primaryFile.path,
            images: imagePaths
        });

        await newCar.save();
        res.status(201).json({message: 'Car and images saved!' });

    } catch(err){
        console.log(err);
    }
}