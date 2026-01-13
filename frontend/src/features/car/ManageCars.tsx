import Form from '../../components/forms/Form.tsx';
import Input from '../../components/forms/Input.tsx';
import SelectField from '../../components/forms/SelectField.tsx';
import { brandOptions } from '../../constants/carOptions.ts';
import { useFormik } from 'formik';
import type { SelectFieldOption } from '../../types/formTypes.ts';
import {
    type LoaderFunctionArgs,
    useNavigation,
    useRevalidator,
    useSubmit,
} from 'react-router';
import * as Yup from 'yup';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import CarCard from '../../components/card/CarCard.tsx';
import CarList from './CarList.tsx';
import { useLoaderData } from 'react-router';
import { getAllCars } from '../../services/carService.ts';
import type { LoadedCarType, LoaderAllCarsType } from '../../types/carTypes.ts';
import { useEffect } from 'react';
import Loader from '../../components/Loader.tsx';

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

export const handleLoadCars = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const brand = url.searchParams.get('brand') || undefined;
    const model = url.searchParams.get('model') || undefined;

    const data = await getAllCars({ brand, model });

    return { cars: data.cars };
};

const ManageCars = () => {
    const { cars } = useLoaderData() as LoaderAllCarsType;
    const submit = useSubmit();
    const navigation = useNavigation();
    const revalidator = useRevalidator();

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

    return (
        <div className="m-20 flex flex-col justify-center gap-5 bg-white px-8 py-12">
            <PrimaryHeader>Manage cars</PrimaryHeader>
            <Form
                handleSubmit={formik.handleSubmit}
                className="w-full flex-row gap-32"
            >
                <SelectField
                    name="brand"
                    options={brandOptions}
                    value={formik.values.brand}
                    onChange={(option) => formik.setFieldValue('brand', option)}
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

            {cars.length === 0 ? (
                <div className="mt-20 mb-10 text-center text-xl text-neutral-500">
                    Sorry... No cars found
                </div>
            ) : (
                <CarList>
                    {isLoading && <Loader />}
                    {cars.length > 0 &&
                        cars.map((car: LoadedCarType) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                </CarList>
            )}
        </div>
    );
};

export default ManageCars;
