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
                />
                <Input
                    type="text"
                    name="model"
                    label="Model"
                    value={formik.values.model}
                    placeholder="Model"
                    handleChange={formik.handleChange}
                />
                <SelectField
                    name="transmission"
                    options={transmissionOptions}
                    onChange={(option) => {
                        formik.setFieldValue('transmission', option);
                    }}
                    value={formik.values.transmission}
                    label="Transmission"
                />
                <SelectField
                    name="bodyType"
                    options={bodyTypeOptions}
                    onChange={(option) => {
                        formik.setFieldValue('bodyType', option);
                    }}
                    value={formik.values.bodyType}
                    label="Body Type"
                />
                <SelectField
                    name="fuelType"
                    options={fuelTypeOptions}
                    onChange={(option) => {
                        formik.setFieldValue('fuelType', option);
                    }}
                    value={formik.values.fuelType}
                    label="Fuel Type"
                />
                <SelectField
                    name="seats"
                    options={seatsOptions}
                    onChange={(option) => {
                        formik.setFieldValue('seats', option);
                    }}
                    value={formik.values.seats}
                    label="Seats"
                />
                <SelectField
                    name="doors"
                    options={doorsOptions}
                    onChange={(option) => {
                        formik.setFieldValue('doors', option);
                    }}
                    value={formik.values.doors}
                    label="Doors"
                />

                <DropzoneImages
                    name="images"
                    label="Select images and click primary photo"
                    onFilesChange={(files) => {
                        formik.setFieldValue('images', files);
                    }}
                    value={formik.values.images}
                    onClearDropzone={clearDropzone}
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
