import ApiClient from "./apiClient.ts";
import type {SignupFormValues} from "../pages/auth/Signup.tsx";

export const signup = async (data: SignupFormValues) => {
    try {
        const res = await ApiClient.post("/auth/signup", data);
        console.log(res.data);
        return res.data
    } catch(err) {
        console.log(err);
    }
}