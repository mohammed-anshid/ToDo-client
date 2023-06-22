import { userApi } from "../../utils/api";

export const signup = async (formData) => {
    try {
        const { data } = await userApi.post('/signup',formData);
        return data;
    } catch (error) {
        return error
    }
}

export const signin = async (formData) => {
    try {
        const { data } = await userApi.post('/signin',formData);
        return data;
    } catch (error) {
        return error
    }
}

export const userProfile = async () => {
    try {
        const { data } = await userApi.get('/profile')
        return data;
    } catch (error) {
        return error
    }
}

export const editProfile = async (formData) => {
    try {
        const { data } = await userApi.patch('/profile',formData);
        return data;
    } catch (error) {
        return error
    }
}

export const editPassword = async (formData,userId) => {
    try {
        const { data } = await userApi.patch(`/security?id=${userId}`,formData);
        return data ;
    } catch (error) {
        return error
    }
}

export const getTasks = async () => {
    try {
        const { data } = await userApi.get('/tasks');
        return data;
    } catch (error) {
        return error;
    }
}

export const addTasks = async (formData) => {
    try {
        const { data } = await userApi.post('/add',formData);
        return data ;
    } catch (error) {
        return error
    }
}

export const addToDos = async (formData,taskId) => {
    try {
        const { data } = await userApi.post('/todos',{formData,taskId});
        return data;
    } catch (error) {
        return error
    }
}

export const checkboxHandle = async (infos) => {
    try {
        const { data } = await userApi.patch('/checkbox',infos)
        return data;
    } catch (error) {
        return error
    }
}