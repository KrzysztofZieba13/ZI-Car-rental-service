import { Request, Response } from 'express';
import Car from "../models/carModel";
import {unlinkImages} from "../utils/utils";
import {PipelineStage} from "mongoose";
import Rent from "../models/rentModel";

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
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const { model, brand } = req.query;

        if (!model && !brand) {
            const cars = await Car.find({});

            return res.status(200).json({
                status: 'success',
                results: cars.length,
                cars: cars,
            });
        }

        const must: any[] = [];
        const filter: any[] = [];

        if (model) {
            must.push({
                autocomplete: {
                    query: model,
                    path: 'model',
                    fuzzy: {
                        maxEdits: 1,
                        prefixLength: 1
                    }
                }
            })
        }

        if (brand) {
            filter.push({
                text: {
                    query: brand,
                    path: 'brand'
                }
            })
        }

        const compound: any = {};

        if (must.length > 0) {
            compound.must = must;
        }
        if (filter.length > 0) {
            compound.filter = filter;
        }

        const pipeline: PipelineStage[] = [
            {
                $search: {
                    index: 'default',
                    compound: compound
                }
            }
        ];

        const cars = await Car.aggregate(pipeline);

        return res.status(200).json({
            status: 'success',
            results: cars.length,
            cars: cars,
        });

    } catch (err){
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id).exec();

        if(!car) return res.status(404).json({
            status: 'error',
            message: 'No car found'
        })

        return res.status(200).json({
            status: 'success',
            car
        })
    } catch(err) {
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
}

export const updateOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { files } = req as MulterRequest & { files: Express.Multer.File[] };

        const primaryImageNameFromClient = req.body.primaryImageName;
        const primaryFile = files?.find(f => f.originalname === primaryImageNameFromClient);

        let primaryImagePath = primaryFile?.path || req.body.primaryImageName;

        if (primaryImagePath && !primaryImagePath.startsWith('public/')) {
            primaryImagePath = `public/${primaryImagePath}`;
        }

        const rawExisting = [].concat(req.body.existingImages || []);
        const prefixedExistingImages = rawExisting
            .filter(Boolean)
            .map((f: string) => (f.startsWith('public/') ? f : `public/${f}`));

        const newImagePaths = files ? files.map((f: any) => f.path) : [];
        const totalImages = [...prefixedExistingImages, ...newImagePaths];

        const car = await Car.findByIdAndUpdate(id, {
            brand: req.body.brand,
            model: req.body.model,
            transmission: req.body.transmission,
            bodyType: req.body.bodyType,
            fuelType: req.body.fuelType,
            doors: Number(req.body.doors),
            seats: Number(req.body.seats),
            primaryImage: primaryImagePath || totalImages[0],
            images: totalImages
        }, {
            runValidators: true,
        });

        if (!car) {
            return res.status(404).json({})
        }

        const imagesToUnlink = car.images.filter(img => !totalImages.includes(img));
        await unlinkImages(imagesToUnlink);

        return res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        })
    }
}


export const deleteOne = async (req: Request, res: Response) => {
    try {
        const carId = req.params.id;

        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({
                status: 'error',
                message: 'No car found'
            });
        }

        await Rent.deleteMany({ car: carId });

        if (deletedCar.images && deletedCar.images.length > 0) {
            await unlinkImages(deletedCar.images);
        }

        return res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};