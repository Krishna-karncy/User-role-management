import { axiosInstance } from "./AxiosUtils";

export const addUser = async (user) => {
    return (await axiosInstance.post('/api/users', user)).data
}

export const getAllUsers = async () => {
    return (await axiosInstance.get('api/auth/userRoles')).data
}

export const getUser = async () => {
    return (await axiosInstance.get('/api/auth/getUserDetails')).data
}