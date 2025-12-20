import ApiClient from "./apiClient.ts";
import type {SignupFormValues} from "../pages/auth/Signup.tsx";
import type {LoginFormValues} from "../pages/auth/Login.tsx";

export const signup = async (data: SignupFormValues) => {
    try {
        const res = await ApiClient.post("/auth/signup", data);
        return res.data
    } catch(err) {
        console.log(err);
    }
}

export const login = async (data: LoginFormValues) => {
    try {
        const res = await ApiClient.post("/auth/signin", data);
        return res.data
    } catch(err) {
        console.log(err);
    }
}