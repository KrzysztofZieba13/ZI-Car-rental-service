import { useApp } from '../../context/AppContext.tsx';
import Modal from './Modal.tsx';
import Button from '../buttons/Button.tsx';
import { deleteCar } from '../../services/carService.ts';
import { useRevalidator } from 'react-router';

interface DeleteModalProps {
    carId: string;
    onClose: () => void;
}

const DeleteModal = ({ carId, onClose }: DeleteModalProps) => {
    const { handleNotification } = useApp();
    const { revalidate } = useRevalidator();

    const handleDelete = async () => {
        try {
            const data = await deleteCar(carId);

            if (data.status === 'success') {
                handleNotification({
                    message: 'Succesfully deleted a car',
                    status: 'success',
                });
                await revalidate();
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed z-20">
            <Modal header="Delete a car">
                <p className="pb-6">Are you sure?</p>
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
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteModal;
