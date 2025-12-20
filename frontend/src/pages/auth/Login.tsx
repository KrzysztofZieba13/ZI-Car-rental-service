import { useFormik } from 'formik';
import { login } from '../../services/authService.ts';
import Auth from './Auth.tsx';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import Form from '../../components/forms/Form.tsx';
import Input from '../../components/forms/Input.tsx';
import Button from '../../components/buttons/Button.tsx';
import LinkUnderline from '../../components/nav/LinkUnderline.tsx';

export interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (data: LoginFormValues) => {
            data = await login(data);
        },
    });

    return (
        <Auth>
            <PrimaryHeader>Sign in to your account</PrimaryHeader>
            <Form handleSubmit={formik.handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    label="Email"
                    placeholder="Email"
                    handleChange={formik.handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    handleChange={formik.handleChange}
                    value={formik.values.password}
                    label="Password"
                    placeholder="Password"
                />
                <Button type="submit">Sign in</Button>
                <LinkUnderline to="/signup">No account yet?</LinkUnderline>
            </Form>
        </Auth>
    );
};

export default Login;
