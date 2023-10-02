import instance from '~/util/http';

export const apiCreateChapter = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'POST',
                url: '/api/chapter/create',
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetSingleChapter = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'GET',
                url: '/api/chapter/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiViewChapter = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/chapter/view/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateChapter = (chapter, id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'PUT',
                url: '/api/chapter/' + id,
                data: chapter,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteChapter = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await instance({
                method: 'DELETE',
                url: '/api/chapter/' + id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
