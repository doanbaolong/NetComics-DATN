import instance from '~/util/http';

export const apiGetNotifications = (userId, query) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/notify/${userId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
