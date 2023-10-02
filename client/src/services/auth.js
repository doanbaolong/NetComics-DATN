import instance from '~/util/http';

export const apiSignUp = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/auth/signup',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiSendMail = (user) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/auth/send-email',
                data: user,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiVerifyEmail = (emailToken) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/auth/verify-email',
                data: { emailToken },
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
                url: '/api/auth/login',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCurrentUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/auth/me',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
