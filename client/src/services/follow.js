import instance from '~/util/http';

export const apiGetFollowingComicsByUser = (query, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/follow/${userId}`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetFollowingComicsByComicIds = (query) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/follow/ids`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetCountFollow = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: `/api/follow/count/${id}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiCheckFollowing = (userId, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: `/api/follow/check-following/${userId}/${comicId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiAddFollowingComic = (userId, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: `/api/follow/${userId}/${comicId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteFollowingComic = (userId, comicId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: `/api/follow/${userId}/${comicId}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
