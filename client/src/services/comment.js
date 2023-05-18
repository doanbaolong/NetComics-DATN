import instance from '~/util/http';

export const apiGetCommentByChapter = (query, chapterId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/comment/${chapterId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
