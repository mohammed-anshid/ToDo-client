import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Success Toast message functionality //
export const SuccessToast = (message) =>{
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

// Error Toast message functionality //
export const ErrorToast = (message) =>{
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}