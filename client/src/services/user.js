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
