import {useFormik} from "formik";
import React from 'react';
import {signup} from "../../services/authService.ts";

export interface SignupFormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const Signup: React.FC = () => {
    const formik = useFormik<SignupFormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit: async (data: SignupFormValues) => {
            data = await signup(data);
            console.log(`Signup successfully sent: ${data}`);
        },
    });

    return (
        <div>
            <h1 className="text-3xl">Signup with Google!</h1>

            <form onSubmit={formik.handleSubmit}>
                <input
                    type='name'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="border p-2 my-1 block"
                    placeholder="Name"
                />
                <input
                    type='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="border p-2 my-1 block"
                    placeholder="Email"
                />
                <input
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="border p-2 my-1 block"
                    placeholder="Password"
                />
                <input
                    type='password'
                    name='passwordConfirm'
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    className="border p-2 my-1 block"
                    placeholder="Password Confirm"
                />
                <button type="submit"
                        className="bg-blue-600 text-white p-2 rounded mt-2">
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;
