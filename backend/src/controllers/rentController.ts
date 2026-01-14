import { Request, Response } from 'express';
import Rent from "../models/rentModel";
import { AuthenticationRequest } from './controllerTypes';

export const create = async (req: AuthenticationRequest, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in',
            });
        }

        const { car, startDate, endDate } = req.body;

        if (!car || !startDate || !endDate) {
            return res.status(400).json({
                status: 'fail',
                message: 'Missing required fields',
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            return res.status(400).json({
                status: 'fail',
                message: 'End date must be after start date',
            });
        }

        const newRent = await Rent.create({
            user: user._id,
            car,
            startDate: start,
            endDate: end,
            status: 'booked',
        });

        return res.status(201).json({
            status: 'success',
            rent: newRent,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Server error',
        });
    }
};

export const getAll = async (req: AuthenticationRequest, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in',
            });
        }

        const rents = await Rent.find({ user: user._id })
            .populate('car')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: 'success',
            results: rents.length,
            rents,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Server error',
        });
    }
};

