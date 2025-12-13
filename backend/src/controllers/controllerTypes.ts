import { IUser } from '../models/userModel';
import { Request } from 'express';

export interface AuthenticationRequest extends Request {
    user?: IUser;
}
