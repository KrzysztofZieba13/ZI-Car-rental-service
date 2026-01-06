import { useFormik } from 'formik';
import Input from '../components/forms/Input.tsx';
import Button from '../components/buttons/Button.tsx';
import Form from '../components/forms/Form.tsx';

interface SearchCarValues {
    carName: string;
}

const SearchCar = () => {
    const formik = useFormik<SearchCarValues>({
        initialValues: {
            carName: '',
        },
        onSubmit: async (data: SearchCarValues) => {
            console.log(data);
        },
    });

    return (
        <Form
            handleSubmit={formik.handleSubmit}
            className="mt-20 flex-row items-center justify-center"
        >
            <Input
                type="text"
                name="carName"
                placeholder="Find a car"
                value={formik.values.carName}
                className="bg-white"
                handleChange={formik.handleChange}
            />
            <Button type="button" className="w-32">
                Filter
            </Button>
        </Form>
    );
};

export default SearchCar;
