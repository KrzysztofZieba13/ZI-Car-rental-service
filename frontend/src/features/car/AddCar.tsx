import Form from '../../components/forms/Form.tsx';
import { type FormikHelpers, useFormik } from 'formik';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import SelectField from '../../components/forms/SelectField.tsx';
import {
    bodyTypeOptions,
    brandOptions,
    doorsOptions,
    fuelTypeOptions,
    seatsOptions,
    transmissionOptions,
} from '../../constants/carOptions.ts';
import Input from '../../components/forms/Input.tsx';
import DropzoneImages from '../../components/forms/Dropzone/DropzoneImages.tsx';
import { createCar } from '../../services/carService.ts';
import * as Yup from 'yup';

export interface AddCarValues {
    brand: SelectFieldOption | null;
    transmission: SelectFieldOption | null;
    model: string;
    bodyType: SelectFieldOption | null;
    fuelType: SelectFieldOption | null;
    doors: SelectFieldOption | null;
    seats: SelectFieldOption | null;
    images: FileWithPreview[];
}

export interface SelectFieldOption {
    value: string;
    label: string;
}

interface FileWithPreview extends File {
    preview: string;
    isPrimary: boolean;
}

const validationSchema = Yup.object().shape({
    brand: Yup.object().nullable().required('Brand is required'),
    model: Yup.string()
        .min(2, 'Model name is too short')
        .max(50, 'Model name is too long')
        .required('Model is required'),
    transmission: Yup.object().nullable().required('Transmission is required'),
    bodyType: Yup.object().nullable().required('Body type is required'),
    fuelType: Yup.object().nullable().required('Fuel type is required'),
    seats: Yup.object().nullable().required('Number of seats is required'),
    doors: Yup.object().nullable().required('Number of doors is required'),
    images: Yup.array()
        .min(1, 'At least one image is required')
        .test('has-primary', 'One image must be set as primary', (images) => {
            return images
                ? images.some((img: FileWithPreview) => img.isPrimary)
                : false;
        }),
});

const AddCar = () => {
    const handleSubmit = async (
        values: AddCarValues,
        { resetForm }: FormikHelpers<AddCarValues>,
    ) => {
        const formData = new FormData();

        formData.append('brand', values.brand?.value || '');
        formData.append('model', values.model);
        formData.append('transmission', values.transmission?.value || '');
        formData.append('bodyType', values.bodyType?.value || '');
        formData.append('fuelType', values.fuelType?.value || '');
        formData.append('doors', values.doors?.value || '');
        formData.append('seats', values.seats?.value || '');
        values.images.forEach((image: FileWithPreview) => {
            formData.append('image', image);

            if (image.isPrimary) {
                formData.append('primaryImageName', image.name);
            }
        });

        try {
            await createCar(formData);
            clearDropzone();
            resetForm();
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik<AddCarValues>({
        initialValues: {
            brand: null,
            model: '',
            transmission: null,
            bodyType: null,
            fuelType: null,
            doors: null,
            seats: null,
            images: [],
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const { images } = formik.values;
    const clearDropzone = () =>
        images.forEach((file) => URL.revokeObjectURL(file.preview));

    return (
        <div className="my-20 flex justify-center">
            <Form
                handleSubmit={formik.handleSubmit}
                className="flex w-1/2 flex-col items-center gap-5 bg-white px-12 py-18"
            >
                <PrimaryHeader>Add new car</PrimaryHeader>
                <SelectField
                    name="brand"
                    options={brandOptions}
                    onChange={(option) => {
                        formik.setFieldValue('brand', option);
                    }}
                    value={formik.values.brand}
                    label="Brand"
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
                    placeholder="Model"
                    handleChange={formik.handleChange}
                    error={
                        formik.touched.model && formik.errors.model
                            ? String(formik.errors.model)
                            : ''
                    }
                />
                <SelectField
                    name="transmission"
                    options={transmissionOptions}
                    onChange={(option) => {
                        formik.setFieldValue('transmission', option);
                    }}
                    value={formik.values.transmission}
                    label="Transmission"
                    error={
                        formik.touched.transmission &&
                        formik.errors.transmission
                            ? String(formik.errors.transmission)
                            : ''
                    }
                />
                <SelectField
                    name="bodyType"
                    options={bodyTypeOptions}
                    onChange={(option) => {
                        formik.setFieldValue('bodyType', option);
                    }}
                    value={formik.values.bodyType}
                    label="Body Type"
                    error={
                        formik.touched.bodyType && formik.errors.bodyType
                            ? String(formik.errors.bodyType)
                            : ''
                    }
                />
                <SelectField
                    name="fuelType"
                    options={fuelTypeOptions}
                    onChange={(option) => {
                        formik.setFieldValue('fuelType', option);
                    }}
                    value={formik.values.fuelType}
                    label="Fuel Type"
                    error={
                        formik.touched.fuelType && formik.errors.fuelType
                            ? String(formik.errors.fuelType)
                            : ''
                    }
                />
                <SelectField
                    name="seats"
                    options={seatsOptions}
                    onChange={(option) => {
                        formik.setFieldValue('seats', option);
                    }}
                    value={formik.values.seats}
                    label="Seats"
                    error={
                        formik.touched.seats && formik.errors.seats
                            ? String(formik.errors.seats)
                            : ''
                    }
                />
                <SelectField
                    name="doors"
                    options={doorsOptions}
                    onChange={(option) => {
                        formik.setFieldValue('doors', option);
                    }}
                    value={formik.values.doors}
                    label="Doors"
                    error={
                        formik.touched.doors && formik.errors.doors
                            ? String(formik.errors.doors)
                            : ''
                    }
                />

                <DropzoneImages
                    name="images"
                    label="Select images and click primary photo"
                    onFilesChange={(files) => {
                        formik.setFieldValue('images', files);
                    }}
                    value={formik.values.images}
                    onClearDropzone={clearDropzone}
                    error={
                        formik.touched.images && formik.errors.images
                            ? String(formik.errors.images)
                            : ''
                    }
                />
                <button
                    type="submit"
                    className="mt-6 w-full bg-red-800 p-2 text-white"
                >
                    Save
                </button>
            </Form>
        </div>
    );
};

export default AddCar;
