import Form from '../../components/forms/Form.tsx';
import { type FormikProps } from 'formik';
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
import type { CarValues } from '../../types/carTypes.ts';

interface ManageCarProps {
    formik: FormikProps<CarValues>;
}

const ManageCar = ({ formik }: ManageCarProps) => {
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

export default ManageCar;
