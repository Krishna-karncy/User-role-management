import { axiosInstance } from "./AxiosUtils";

export const getAllPermissions = async () => {
    return (await axiosInstance.get('/api/auth/getPermissions')).data
}

export const addPermission = async (permission) => {
    return (await axiosInstance.post('/api/permissions', permission)).data
}