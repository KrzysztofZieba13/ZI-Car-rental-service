import Form from '../../components/forms/Form.tsx';
import Input from '../../components/forms/Input.tsx';
import SelectField from '../../components/forms/SelectField.tsx';
import { brandOptions } from '../../constants/carOptions.ts';
import { useFormik } from 'formik';
import type { SelectFieldOption } from '../../types/formTypes.ts';
import {
    type LoaderFunctionArgs,
    useLocation,
    useNavigation,
    useRevalidator,
    useSubmit,
} from 'react-router';
import * as Yup from 'yup';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import CarCard from '../../components/card/CarCard.tsx';
import CarList from './CarList.tsx';
import { useLoaderData } from 'react-router';
import { getAllCars, myRentals } from '../../services/carService.ts';
import type {
    CarWithRental,
    LoadedCarType,
    LoaderAllCarsType,
    LoaderCarsType,
    Rent,
} from '../../types/carTypes.ts';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader.tsx';
import { userContext } from '../../middlewares/authMiddleware.ts';
import RentModal from '../../components/modal/RentModal.tsx';
import DeleteModal from '../../components/modal/DeleteModal.tsx';

interface ManageCarsValues {
    brand: SelectFieldOption | null;
    model: string;
}

const validationSchema = Yup.object().shape({
    brand: Yup.object().nullable(),
    model: Yup.string()
        .min(2, 'Model name is too short')
        .max(50, 'Model name is too long'),
});

export const handleLoadCars = async ({
    request,
    context,
}: LoaderFunctionArgs) => {
    try {
        const url = new URL(request.url);
        const brand = url.searchParams.get('brand') || undefined;
        const model = url.searchParams.get('model') || undefined;

        const user = context.get(userContext);

        const data = await getAllCars({ brand, model });

        return { cars: data.cars, user };
    } catch (error) {
        console.error(error);
        return {
            cars: [],
            user: null,
        };
    }
};

export const handleLoadRentals = async ({
    context,
}: LoaderFunctionArgs): Promise<LoaderCarsType> => {
    try {
        const user = context.get(userContext);
        if (!user) return { cars: [], user: null };

        const data = await myRentals();

        const cars: CarWithRental[] = data.rents.map((rent: Rent) => ({
            ...rent.car,
            rental: rent,
        }));

        return { cars, user };
    } catch (err) {
        console.error(err);
        return { cars: [], user: null };
    }
};

const Cars = () => {
    const { cars, user } = useLoaderData() as LoaderAllCarsType;
    const submit = useSubmit();
    const navigation = useNavigation();
    const [rentModal, setRentModal] = useState(false);
    const revalidator = useRevalidator();
    const [carId, setCarId] = useState<string>('');
    const location = useLocation();
    const [deleteModal, setDeleteModal] = useState(false);
    const { pathname } = location;

    const formik = useFormik<ManageCarsValues>({
        initialValues: {
            brand: null,
            model: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const params: Record<string, string> = {};
            if (values.brand?.value) params.brand = values.brand.value;
            if (values.model) params.model = values.model;

            submit(params, { replace: true });
        },
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            formik.submitForm();
        }, 500);

        return () => clearTimeout(timer);
    }, [formik.values.brand, formik.values.model]);

    const isLoading: boolean =
        navigation.state !== 'idle' || revalidator.state !== 'idle';

    const isAdmin: boolean = user.role === 'admin';

    const handleRentCar = (carId: string) => {
        setRentModal(true);
        setCarId(carId);
    };

    const handleDeleteCar = (carId: string) => {
        setDeleteModal(true);
        setCarId(carId);
    };

    return (
        <div className="m-20 flex flex-col justify-center gap-5 bg-white px-8 py-12">
            {rentModal && (
                <RentModal carId={carId} onClose={() => setRentModal(false)} />
            )}
            {deleteModal && (
                <DeleteModal
                    carId={carId}
                    onClose={() => setDeleteModal(false)}
                />
            )}
            <PrimaryHeader>
                {isAdmin
                    ? 'Manage cars'
                    : pathname === '/rentals'
                      ? 'Your rentals'
                      : 'Search cars'}
            </PrimaryHeader>
            {pathname !== '/rentals' && (
                <Form
                    handleSubmit={formik.handleSubmit}
                    className="w-full flex-row gap-32"
                >
                    <SelectField
                        name="brand"
                        options={brandOptions}
                        value={formik.values.brand}
                        onChange={(option) =>
                            formik.setFieldValue('brand', option)
                        }
                        label="Brand"
                        displayInline
                        isClearable
                        error={
                            formik.touched.brand && formik.errors.brand
                                ? String(formik.errors.brand)
                                : ''
                        }
                    />
                    <Input
                        type="text"
                        name="model"
                        label="Model"
                        value={formik.values.model}
                        placeholder="Search for model"
                        handleChange={formik.handleChange}
                        displayInline
                        error={
                            formik.touched.model && formik.errors.model
                                ? String(formik.errors.model)
                                : ''
                        }
                    />
                </Form>
            )}

            {cars.length === 0 ? (
                <div className="mt-20 mb-10 text-center text-xl text-stone-500">
                    Sorry... No cars found
                </div>
            ) : (
                <CarList>
                    {isLoading && <Loader />}
                    {cars.length > 0 &&
                        cars.map((car: LoadedCarType) => (
                            <CarCard
                                key={car.rental?._id || car._id}
                                car={car}
                                rental={car.rental}
                                onClickRent={() => handleRentCar(car._id)}
                                onClickDelete={() => handleDeleteCar(car._id)}
                            />
                        ))}
                </CarList>
            )}
        </div>
    );
};

export default Cars;
