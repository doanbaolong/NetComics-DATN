import { toast } from 'react-toastify';
export const toastSuccess = (messsage, position = 'top-right') =>
    toast.success(messsage, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });

export const toastInfo = (messsage, position = 'top-right') =>
    toast.info(messsage, {
        position: position,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
