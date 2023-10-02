import instance from '~/util/http';

export const apiGetAuthors = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/author/all',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiCreateAuthor = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/author/create',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetSingleAuthor = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/author/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateAuthor = (author, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/author/' + id,
                data: author,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteAuthor = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: '/api/author/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
