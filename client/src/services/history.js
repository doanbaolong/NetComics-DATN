import instance from '~/util/http';

export const apiGetHistoryComicsByUser = (query, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/history/${userId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetHistoryComicsByComicIds = (query) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/history/ids`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiAddHistoryComic = (userId, comicId, chapterIds, chapterId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: `/api/history/${userId}/${comicId}`,
                params: { chapterIds, chapterId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteHistoryComic = (userId, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: `/api/history/${userId}/${comicId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
