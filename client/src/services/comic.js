import instance from '~/util/http';

export const apiGetComics = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/comic/all',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiCreateComic = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/comic/create',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetSingleComic = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/comic/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateComic = (comic, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/comic/' + id,
                data: comic,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteComic = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: '/api/comic/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
