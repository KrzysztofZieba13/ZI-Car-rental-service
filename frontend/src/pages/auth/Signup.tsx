import { useFormik } from 'formik';
import React from 'react';
import { signup } from '../../services/authService.ts';
import Auth from './Auth.tsx';
import PrimaryHeader from '../../components/headers/PrimaryHeader.tsx';
import Form from '../../components/forms/Form.tsx';
import Input from '../../components/forms/Input.tsx';
import Button from '../../components/buttons/Button.tsx';
import LinkUnderline from '../../components/nav/LinkUnderline.tsx';
import { useNavigate } from 'react-router';

export interface SignupFormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const formik = useFormik<SignupFormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit: async (data: SignupFormValues) => {
            try {
                await signup(data);
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <Auth>
            <PrimaryHeader>Create new account</PrimaryHeader>
            <Form handleSubmit={formik.handleSubmit}>
                <Input
                    type="name"
                    name="name"
                    handleChange={formik.handleChange}
                    value={formik.values.name}
                    label="Name"
                    placeholder="Name"
                />
                <Input
                    type="email"
                    name="email"
                    handleChange={formik.handleChange}
                    value={formik.values.email}
                    label="Email"
                    placeholder="Email"
                />
                <Input
                    type="password"
                    name="password"
                    handleChange={formik.handleChange}
                    value={formik.values.password}
                    label="Password"
                    placeholder="Password"
                />
                <Input
                    type="password"
                    name="passwordConfirm"
                    handleChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    label="Password Confirm"
                    placeholder="Password Confirm"
                />
                <Button type="submit" className="mt-2">
                    Sign up
                </Button>
                <LinkUnderline to="/login">Use existing account</LinkUnderline>
            </Form>
        </Auth>
    );
};

export default Signup;
