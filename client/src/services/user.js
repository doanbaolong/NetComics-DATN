import instance from '~/util/http';

export const apiGetUsers = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/user/all',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUser = (user, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/user/' + id,
                data: user,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiChangePassword = (passwords, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/user/change-pass/' + id,
                data: passwords,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiLockUser = (data, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/user/lock/' + id,
                data,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
