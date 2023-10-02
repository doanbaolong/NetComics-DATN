import instance from '~/util/http';

export const apiGetCommentByComic = (query, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/comment/comic/${comicId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCommentByChapter = (query, chapterId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/comment/chapter/${chapterId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
