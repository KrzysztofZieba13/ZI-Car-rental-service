import { Request, Response, CookieOptions, NextFunction } from 'express';
import { Types } from 'mongoose';
import { StringValue } from 'ms';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import { JWT_COOKIE_NAME, JWT_REFRESH_COOKIE_NAME } from '../common/constants';
import { AuthenticationRequest } from './controllerTypes';

const ENV: string = process.env.NODE_ENV || 'development';

const signToken = (id: Types.ObjectId, jwtExpiresTime: StringValue): string => {
    const jwtSecret: string | undefined = process.env.JWT_SECRET;
    if (!jwtSecret || !jwtExpiresTime) {
        throw new Error('JWT_SECRET is missing or JWT_EXPIRES is not set');
    }

    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresTime });
};

const getTokenCookies = (path: string = '/') => {
    const jwtCookieExpireDays: string | undefined = process.env.JWT_COOKIE_EXPIRES;

    if (!jwtCookieExpireDays) {
        throw new Error('JWT_COOKIE_EXPIRES is missing');
    }

    const cookieTokenOptions: CookieOptions = {
        httpOnly: true,
        expires: new Date(
            Date.now() + Number(jwtCookieExpireDays) * 24 * 60 * 60 * 1000,
        ),
        secure: ENV === 'production',
        path: path || '/',
    };

    return cookieTokenOptions;
};
const createSendToken = async (
    user: IUser,
    statusCode: number,
    res: Response,
): Promise<void> => {
    const jwtAccessExpires = process.env.JWT_ACCESS_EXPIRES as StringValue;
    const jwtRefreshExpires = process.env.JWT_REFRESH_EXPIRES as StringValue;
    const accessToken: string = signToken(user._id, jwtAccessExpires);
    const refreshToken: string = signToken(user._id, jwtRefreshExpires);

    res.cookie(JWT_COOKIE_NAME, accessToken, getTokenCookies());
    res.cookie(
        JWT_REFRESH_COOKIE_NAME,
        refreshToken,
        getTokenCookies('/api/auth'),
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    user.password = undefined;
    user.refreshToken = undefined;

    res.status(statusCode).json({
        status: 'success',
        accessToken,
        data: {
            user,
        },
    });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    const newUser: IUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });

    await createSendToken(newUser, 201, res);
};

export const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email }).select('+password');

    if (!user.password){
        throw new Error('Password is missing');
    }

    if (!user || !(await user.compareValues(password, user.password))) {
        throw new Error(`Incorrect password or email address`);
    }

    await createSendToken(user, 200, res);
};

export const refreshToken = async (req: Request, res: Response) => {
    const oldRefreshToken: string = req.cookies[
        JWT_REFRESH_COOKIE_NAME
    ] as string;
    const clearTokens = () => {
        res.clearCookie(JWT_REFRESH_COOKIE_NAME, {
            path: '/api/auth/refresh',
        });
        res.clearCookie(JWT_COOKIE_NAME);
    };

    if (!process.env.JWT_SECRET){
        throw new Error('JWT_SECRET is missing');
    }

    try {
        const decodedToken: any = jwt.verify(
            oldRefreshToken,
            process.env.JWT_SECRET,
        );
        const user: IUser | null = await User.findById(decodedToken.id).select(
            '+refreshToken',
        );

        const isUnauthorized = !user || !user.refreshToken;

        if (isUnauthorized) {
            clearTokens();
            return res.status(401).json({
                status: 'fail',
                message: 'Użytkownik nie istnieje lub token unieważniony.',
            });
        }

        if (!user.refreshToken){
            throw new Error('User refresh token is missing');
        }

        const matchToken = await user.compareValues(
            oldRefreshToken,
            user.refreshToken,
        );
        if (!matchToken) {
            clearTokens();
            return res.status(401).json({
                status: 'fail',
                message: 'Nieprawidłowy Refresh token.',
            });
        }

        await createSendToken(user, 200, res);
    } catch (err) {
        clearTokens();
        return res.status(401).json({ status: 'fail', message: 'Error' });
    }
};

const jwtVerifyPromisified = (token: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        });
    });
};

export const protect = async (
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction,
) => {
    const accessToken = req.cookies[JWT_COOKIE_NAME];
    const jwtSecret: string | undefined = process.env.JWT_SECRET;

    if (!accessToken) {
        res.status(401).json({
            status: 'fail',
            message: 'No jwt token provided',
        });
    }

    try {
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is missing');
        }

        const decoded: any = await jwtVerifyPromisified(accessToken, jwtSecret);
        const user: IUser | null = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User matched to this token no longer exists',
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'fail',
            message: 'Token dostępu jest nieprawidłowy lub wygasł.',
        });
    }
};
