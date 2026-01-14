import { IUser } from '../models/userModel.js';
import { Request } from 'express';

export interface AuthenticationRequest extends Request {
    user?: IUser;
}
