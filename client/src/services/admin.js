import instance from '~/util/http';

export const apiAdminSignUp = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/admin/signup',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiAdminLogIn = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/admin/login',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCurrentAdmin = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/admin/me',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
