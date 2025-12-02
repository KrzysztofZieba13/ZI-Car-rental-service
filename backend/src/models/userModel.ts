import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

type UserRolesType = 'user' | 'admin' | 'employee';
export interface IUser extends Document {
    name: string;
    email: string;
    photo: string;
    role: UserRolesType;
    password?: string;
    passwordConfirm?: string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    active?: boolean;
    comparePassword(
        candidatePassword: string,
        password: string,
    ): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is require'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'employee'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        trim: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el: string) {
                return el === (this as any).password;
            },
            message: 'Passwords are different',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async (
    candidatePassword: string,
    password: string,
): Promise<boolean> => {
    return await bcrypt.compare(candidatePassword, password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
