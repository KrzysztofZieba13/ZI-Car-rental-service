import Form from '../../components/forms/Form.tsx';
import Input from '../../components/forms/Input.tsx';
import SelectField from '../../components/forms/SelectField.tsx';
import { brandOptions } from '../../constants/carOptions.ts';
import { useFormik } from 'formik';
import type { SelectFieldOption } from '../../types/formTypes.ts';
import * as Yup from 'yup';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import CarCard from '../../components/card/CarCard.tsx';
import CarList from './CarList.tsx';
import { useLoaderData } from 'react-router';
import { getAllCars } from '../../services/carService.ts';
import type { LoadedCarType, LoaderAllCarsType } from '../../types/carTypes.ts';

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

export const handleLoadCars = async () => {
    const data = await getAllCars();
    return { cars: data.cars };
};

const ManageCars = () => {
    const { cars } = useLoaderData() as LoaderAllCarsType;

    const formik = useFormik<ManageCarsValues>({
        initialValues: {
            brand: null,
            model: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => console.log('Submitting...'),
    });

    return (
        <div className="m-20 flex flex-col justify-center gap-5 bg-white px-8 py-12">
            <PrimaryHeader>Manage cars</PrimaryHeader>
            <Form handleSubmit={() => {}} className="w-full flex-row gap-32">
                <SelectField
                    name="brand"
                    options={brandOptions}
                    value={formik.values.brand}
                    onChange={(option) => formik.setFieldValue('brand', option)}
                    label="Brand"
                    displayInline
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
            <CarList>
                {cars.map((car: LoadedCarType) => (
                    <CarCard car={car} />
                ))}
            </CarList>
        </div>
    );
};

export default ManageCars;
