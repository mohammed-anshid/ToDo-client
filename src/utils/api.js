import axios from "axios";

// User API
export const userApi = axios.create({ baseURL:'http://localhost:4002'})

userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
      req.headers.accesstoken = localStorage.getItem("userToken");
    }
    return req;
});