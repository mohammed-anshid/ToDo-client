import { userApi } from "../../utils/api";


// ---> signup <--- //
export const signup = async (formData) => {
    try {
        const { data } = await userApi.post('/signup',formData);
        return data;
    } catch (error) {
        return error
    }
}

// ---> signin <--- //
export const signin = async (formData) => {
    try {
        const { data } = await userApi.post('/signin',formData);
        return data;
    } catch (error) {
        return error
    }
}

// ---> User Profile <--- //
export const userProfile = async () => {
    try {
        const { data } = await userApi.get('/profile')
        return data;
    } catch (error) {
        return error
    }
}

// ---> Edit Profile <--- //
export const editProfile = async (formData) => {
    try {
        const { data } = await userApi.patch('/profile',formData);
        return data;
    } catch (error) {
        return error
    }
}

// ---> Edit Password <--- //
export const editPassword = async (formData,userId) => {
    try {
        const { data } = await userApi.patch(`/security?id=${userId}`,formData);
        return data ;
    } catch (error) {
        return error
    }
}

// ---> Get All Tasks <--- //
export const getTasks = async () => {
    try {
        const { data } = await userApi.get('/tasks');
        return data;
    } catch (error) {
        return error;
    }
}

// ---> Add Tasks <--- //
export const addTasks = async (formData) => {
    try {
        const { data } = await userApi.post('/add',formData);
        return data ;
    } catch (error) {
        return error
    }
}

// ---> Edit Tasks <--- //
export const editTask = async (taskId,task) => {
    try {
        console.log(taskId)
        const { data } = await userApi.patch(`/edit-task?id=${taskId}&task=${task}`);
        return data ;
    } catch (error) {
        return error ;
    }
}

// ---> Remove Tasks <--- //
export const removeTask = async (taskId) => {
    try {
        console.log('hello')
        const { data } = await userApi.patch(`/delete-task?id=${taskId}`);
        return data ;
    } catch (error) {
        return error ;
    }
}

// ---> Add Todo to Tasks <--- //
export const addToDos = async (formData,taskId) => {
    try {
        const { data } = await userApi.post('/todos',{formData,taskId});
        return data;
    } catch (error) {
        return error
    }
}

// ---> Remove Todo from Tasks <--- //
export const removeTodos = async (formData) => {
    try {
        const { data } = await userApi.patch('/remove-todo',formData)
        return data;
    } catch (error) {
        return error;
    }
}

// ---> CheckBox Management <--- //
export const checkboxHandle = async (infos) => {
    try {
        const { data } = await userApi.patch('/checkbox',infos)
        return data;
    } catch (error) {
        return error
    }
}