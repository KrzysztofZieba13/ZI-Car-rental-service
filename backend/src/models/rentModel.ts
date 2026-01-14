import mongoose, { Schema, Types } from "mongoose";

export interface IRent {
    user: Types.ObjectId;
    car: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: 'booked' | 'active' | 'completed' | 'cancelled';
}

const rentSchema = new Schema<IRent>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: [
            function (this: any, value: Date) {
                if (!this.startDate) return true;
                return this.startDate <= value;
            },
            'End date must be after start date',
        ],
    }
}, { timestamps: true });

const Rent = mongoose.model<IRent>('Rent', rentSchema);

export default Rent;