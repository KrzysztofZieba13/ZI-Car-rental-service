import Image from '../image/Image.tsx';
import ThirdHeader from '../headers/ThirdHeader.tsx';
import Button from '../buttons/Button.tsx';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Card from './Card.tsx';
import type { LoadedCarType, Rent } from '../../types/carTypes.ts';
import { Link, useLoaderData } from 'react-router';
import { formatDatePL } from '../../utils/util.ts';

interface CarCardProps {
    car: LoadedCarType;
    rental: Rent;
    onClickRent: () => void;
    onClickDelete: () => void;
}

const CarCard = ({ car, rental, onClickRent, onClickDelete }: CarCardProps) => {
    const brand: string = car?.brand?.toUpperCase();
    const model: string = car?.model;
    const { user } = useLoaderData();
    const carPrimaryImage: string = car.primaryImage;
    const primaryImgUrl: string = `${import.meta.env.VITE_SERVER_URL}${carPrimaryImage.split('/').at(1)}`;
    const isWebpPrimary = carPrimaryImage.endsWith('.webp');
    const primaryImageWebpSrc: string = isWebpPrimary ? primaryImgUrl : '';
    const primaryImageJpgSrc: string = !isWebpPrimary ? primaryImgUrl : '';

    const isAdmin = user.role === 'admin';

    return (
        <Card>
            <Image
                srcWEBP={primaryImageWebpSrc}
                srcJPG={primaryImageJpgSrc}
                alt="Mercedes class C"
                className="h-72 rounded-t-sm"
            />

            <div className="mt-2 flex flex-col px-4 py-2">
                <ThirdHeader>
                    {`${brand} ${model.toUpperCase()}`}{' '}
                    {rental ? (
                        <span className="text-sm text-stone-400">
                            (
                            {`${formatDatePL(rental.startDate)} - 
                            ${formatDatePL(rental.endDate)}`}
                            )
                        </span>
                    ) : (
                        ''
                    )}
                </ThirdHeader>
                <ul className="mt-1 flex flex-col gap-2">
                    <li>
                        Brand: <span>{brand}</span>
                    </li>
                    <li>
                        Model: <span>{model}</span>
                    </li>
                    <li>
                        Transmission: <span>{car.transmission}</span>
                    </li>
                    <li>
                        Body Type: <span>{car.bodyType}</span>
                    </li>
                    <li>
                        Fuel Type: <span>{car.fuelType}</span>
                    </li>
                    <li>
                        Seats: <span>{car.seats}</span>
                    </li>
                    <li>
                        Doors: <span>{car.doors}</span>
                    </li>
                </ul>
                <div className="mt-8 flex justify-end gap-3">
                    {isAdmin && (
                        <>
                            <Button
                                type="button"
                                variant="transparent"
                                className="flex items-center gap-0.5 p-0 text-stone-700 hover:text-red-800"
                            >
                                <Link
                                    to={`/admin/cars/${car._id}`}
                                    className="flex items-center gap-0.5"
                                >
                                    <PencilIcon className="size-3.5" />
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                type="button"
                                variant="transparent"
                                className="flex items-center gap-0.5 p-0 text-stone-700 hover:text-red-800"
                                onClick={onClickDelete}
                            >
                                <TrashIcon className="size-3.5" />
                                Delete
                            </Button>
                        </>
                    )}
                    {!isAdmin && !rental && (
                        <Button
                            type="button"
                            variant="border"
                            onClick={onClickRent}
                        >
                            Rent
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CarCard;
