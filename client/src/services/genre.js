import instance from '~/util/http';

export const apiGetGenres = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/genre/all',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiCreateGenre = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/genre/create',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetSingleGenre = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/genre/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetSingleGenreBySlug = (slug) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/genre/slug/' + slug,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateGenre = (genre, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/genre/' + id,
                data: genre,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteGenre = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: '/api/genre/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
