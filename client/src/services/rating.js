import instance from '~/util/http';

export const apiAddRatingComic = (rating, userId, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: `/api/rating/${userId}/${comicId}`,
                data: rating,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetRatings = (comicId, query) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/notify/${comicId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
