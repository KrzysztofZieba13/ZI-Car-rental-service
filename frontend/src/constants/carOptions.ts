import type { SelectFieldOption } from '../features/car/AddCar.tsx';

export const brandOptions: SelectFieldOption[] = [
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'ford', label: 'Ford' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'tesla', label: 'Tesla' },
    { value: 'porsche', label: 'Porsche' },
    { value: 'lexus', label: 'Lexus' },
    { value: 'volvo', label: 'Volvo' },
];

export const transmissionOptions: SelectFieldOption[] = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
];

export const bodyTypeOptions: SelectFieldOption[] = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'wagon', label: 'Station Wagon (Kombi)' },
    { value: 'convertible', label: 'Convertible (Cabrio)' },
    { value: 'van', label: 'Van / Minivan' },
];

export const fuelTypeOptions: SelectFieldOption[] = [
    { value: 'petrol', label: 'Petrol (Benzyna)' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' },
    { value: 'lpg', label: 'LPG' },
];

export const seatsOptions: SelectFieldOption[] = [
    { value: '2', label: '2 Seats' },
    { value: '4', label: '4 Seats' },
    { value: '5', label: '5 Seats' },
    { value: '7', label: '7 Seats' },
    { value: '9', label: '9 Seats' },
];

export const doorsOptions: SelectFieldOption[] = [
    { value: '2', label: '2 Doors' },
    { value: '3', label: '3 Doors' },
    { value: '4', label: '4 Doors' },
    { value: '5', label: '5 Doors' },
];
