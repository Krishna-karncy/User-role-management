import { axiosInstance } from "./AxiosUtils";

export const getAllRoles = async () => {
    return (await axiosInstance.get('/api/auth/rolePermission')).data
}

export const addRole = async (role) => {
    return (await axiosInstance.post('/api/roles', role)).data
}

export const editRole = async (role) => {
    return (await axiosInstance.post('/api/auth/editRole', role)).data
}