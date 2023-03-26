import instance from '~/util/http';

export const apiSignUp = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/v1/auth/signup',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiLogIn = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/v1/auth/login',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });