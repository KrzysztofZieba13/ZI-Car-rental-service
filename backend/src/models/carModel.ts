import mongoose, {Schema} from "mongoose";

const carSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        maxLength: 50,
    },
    transmission: {
        type: String,
        enum: ['manual', 'automatic']
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
        maxLength: 50,
    },
    bodyType: {
        type: String,
        required: [true, 'Body type is required'],
        trim: true,
        maxLength: 50,
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'hybrid', 'electric', 'lpg']
    },
    seats: {
        type: Number,
        enum: [2, 4, 5, 7, 9]
    },
    doors: {
        type: Number,
        enum: [2, 3, 4, 5]
    },
    primaryImage: {
        type: String,
        default: 'default_car.jpg'
    },
    images: [{ type: String }]
})

const Car = mongoose.model('Car', carSchema);

export default Car;