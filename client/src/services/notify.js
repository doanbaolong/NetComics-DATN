import instance from '~/util/http';

export const apiGetNotifications = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/notify/${userId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
