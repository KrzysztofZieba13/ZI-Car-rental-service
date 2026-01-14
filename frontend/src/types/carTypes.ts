import type { handleLoadCars } from '../features/car/Cars.tsx';
import type {
    FileWithPreview,
    SelectFieldOption,
    ServerImage,
} from './formTypes.ts';
import type { handleLoadCar } from '../features/car/AdminCar.tsx';
import type { User } from './userTypes.ts';

export interface CarValues {
    brand: SelectFieldOption | null;
    transmission: SelectFieldOption | null;
    model: string;
    bodyType: SelectFieldOption | null;
    fuelType: SelectFieldOption | null;
    doors: SelectFieldOption | null;
    seats: SelectFieldOption | null;
    images: (FileWithPreview | ServerImage)[];
}

export interface RentCarValues {
    startDate: Date | null;
    endDate: Date | null;
}

export type LoaderAllCarsType = Awaited<ReturnType<typeof handleLoadCars>>;
export type LoaderCarType = Awaited<ReturnType<typeof handleLoadCar>>;
export type LoadedCarType = LoaderAllCarsType['cars'][number];

export interface Car {
    _id: string;
    brand: string;
    model: string;
    transmission: string;
    bodyType: string;
    fuelType: string;
    seats: number;
    doors: number;
    primaryImage: string;
    images: string[];
}

export interface Rent {
    _id: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    car: Car;
}

export interface LoaderCarsType {
    cars: CarWithRental[];
    user: User | null;
}

export interface CarWithRental extends Car {
    rental?: Rent;
}
