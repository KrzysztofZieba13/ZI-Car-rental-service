import Modal from './Modal.tsx';
import Form from '../forms/Form.tsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import type { RentCarValues } from '../../types/carTypes.ts';
import 'react-datepicker/dist/react-datepicker.css';
import DateField from '../forms/DateField.tsx';
import Button from '../buttons/Button.tsx';
import { rentCar } from '../../services/carService.ts';
import { useApp } from '../../context/AppContext.tsx';

const validationSchema = Yup.object().shape({
    startDate: Yup.date().nullable().required('Start date is required'),
    endDate: Yup.date().nullable().required('End date is required'),
});

interface RentModalProps {
    carId: string;
    onClose: () => void;
}

const RentModal = ({ carId, onClose }: RentModalProps) => {
    const { handleNotification } = useApp();
    const formik = useFormik<RentCarValues>({
        initialValues: {
            startDate: null,
            endDate: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (!values.startDate || !values.endDate) return;

                const data = await rentCar(
                    carId,
                    values.startDate,
                    values.endDate,
                );

                if (data.status === 'success') {
                    handleNotification({
                        status: 'success',
                        message: 'Successfully rent car.',
                    });
                    onClose();
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className="fixed z-20">
            <Modal header="Rent a car">
                <Form
                    handleSubmit={formik.handleSubmit}
                    className="flex flex-col gap-8"
                >
                    <DateField
                        name="rentalDates"
                        label="Rental period"
                        startDate={formik.values.startDate}
                        endDate={formik.values.endDate}
                        displayInline
                        onChange={(dates) => {
                            const [start, end] = dates;
                            formik.setFieldValue('startDate', start);
                            formik.setFieldValue('endDate', end);
                        }}
                        placeholder="Choose dates..."
                        error={
                            formik.touched.startDate
                                ? (formik.errors.startDate as string)
                                : ''
                        }
                    />
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="border"
                            className="w-20"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-20 rounded p-1"
                        >
                            Rent
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default RentModal;
