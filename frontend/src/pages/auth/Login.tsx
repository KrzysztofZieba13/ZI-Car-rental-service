import {useFormik} from "formik";

interface ILoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const formik = useFormik<ILoginFormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values: ILoginFormValues) => {
            console.log('Dane do wysłania:', values);
        },
    });

    return (
        <div>
            <h1 className="text-3xl">Sign in with Google!</h1>

            <form onSubmit={formik.handleSubmit}>
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
                    placeholder="Hasło"
                />
                <button type="submit"
                        className="bg-blue-600 text-white p-2 rounded mt-2">
                    Zaloguj
                </button>
            </form>
        </div>
    );
};

export default Login;