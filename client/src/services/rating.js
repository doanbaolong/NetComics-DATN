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
