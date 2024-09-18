import { axiosInstance } from "./AxiosUtils";

export const loginUser = async (loginDetails) => {
    return (await axiosInstance.post('api/auth/LoginTest', loginDetails)).data
}

export const logoutUser = async () => {
    return (await axiosInstance.post('api/auth/logout')).data;
}