import axios from "axios";

// User API //
export const userApi = axios.create({ baseURL:'https://todo-api-1ffi.onrender.com'})

//--> Modified Requests with Interceptors <--//
userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
      req.headers.accesstoken = localStorage.getItem("userToken");
    }
    return req;
});