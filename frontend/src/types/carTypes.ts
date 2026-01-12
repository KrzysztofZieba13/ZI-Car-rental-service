import type { handleLoadCars } from '../features/car/ManageCars.tsx';
import type {
    FileWithPreview,
    SelectFieldOption,
    ServerImage,
} from './formTypes.ts';
import type { handleLoadCar } from '../features/car/AdminCar.tsx';

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

export type LoaderAllCarsType = Awaited<ReturnType<typeof handleLoadCars>>;
export type LoaderCarType = Awaited<ReturnType<typeof handleLoadCar>>;
export type LoadedCarType = LoaderAllCarsType['cars'][number];
