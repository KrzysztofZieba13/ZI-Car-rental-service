import { Request, Response, CookieOptions } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

const ENV: string = process.env.NODE_ENV || 'development';

const signToken = (id: Types.ObjectId): string => {
    const jwtSecret: string = process.env.JWT_SECRET;
    const jwtExpires: number = Number(process.env.JWT_EXPIRES);
    if (!jwtSecret || !jwtExpires) {
        throw new Error('JWT_SECRET is missing or JWT_EXPIRES is not set');
    }

    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpires });
};
const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token: string = signToken(user._id);
    const jwtCookieExpireDays: string = process.env.JWT_COOKIE_EXPIRES;
    if (!jwtCookieExpireDays) {
        throw new Error('JWT_COOKIE_EXPIRES is missing');
    }

    const cookieOption: CookieOptions = {
        httpOnly: true,
        expires: new Date(
            Date.now() + Number(jwtCookieExpireDays) * 24 * 60 * 60 * 1000,
        ),
        secure: ENV === 'production',
    };

    res.cookie('jwt', token, cookieOption);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

export const signup = async (req: Request, res: Response) => {
    const newUser: IUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });

    createSendToken(newUser, 201, res);
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email }).select('password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        throw new Error(`Incorrect password or email address`);
    }

    createSendToken(user, 200, res);
};
