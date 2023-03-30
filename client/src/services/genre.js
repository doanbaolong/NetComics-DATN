import instance from '~/util/http';

export const apiGetGenres = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/v1/genre/all',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
