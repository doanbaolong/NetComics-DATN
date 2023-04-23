import { toast } from 'react-toastify';
export const toastSuccess = (messsage) =>
    toast.success(messsage, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
