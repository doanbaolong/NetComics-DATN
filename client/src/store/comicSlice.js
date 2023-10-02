import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetComics,
    apiCreateComic,
    apiGetSingleComic,
    apiUpdateComic,
    apiDeleteComic,
    apiGetComicsLimit,
    apiGetComicsByGenreLimit,
    apiSearchComic,
} from '~/services/comic';
import {
    GET_COMICS,
    ADD_COMIC,
    GET_COMICS_LIMIT,
    GET_SINGLE_COMIC,
    UPDATE_COMIC,
    DELETE_COMIC,
    GET_COMICS_BY_GENRE_LIMIT,
    SEARCH_COMIC,
} from './constant';

export const comicSlice = createSlice({
    name: 'comic',
    initialState: {
        comics: [],
        searchComics: [],
        comic: null,
        count: 0,
        searchCount: 0,
        limit: 0,
        addComicMessage: '',
        updateComicMessage: '',
        deleteComicMessage: '',
        getComicsByGenreStatus: '',
        getComicsLimitStatus: '',
        getComicsStatus: '',
        getSingleComicStatus: '',
        addComicStatus: '',
        updateComicStatus: '',
        deleteComicStatus: '',
        searchComicMessage: '',
        searchComicStatus: '',
    },
    reducers: {
        reset: (state, action) => ({
            ...state,
            comics: [],
            searchComics: [],
            comic: null,
            count: 0,
            searchCount: 0,
            limit: 0,
            addComicMessage: '',
            updateComicMessage: '',
            deleteComicMessage: '',
            getComicsByGenreStatus: '',
            getComicsLimitStatus: '',
            getComicsStatus: '',
            getSingleComicStatus: '',
            addComicStatus: '',
            updateComicStatus: '',
            deleteComicStatus: '',
            searchComicMessage: '',
            searchComicStatus: '',
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComicsLimit.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'pending',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsLimit.fulfilled, (state, action) => ({
                ...state,
                comics: action.payload?.rows,
                count: action.payload?.count,
                limit: action.payload?.limit,
                comic: null,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'success',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsLimit.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'rejected',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComics.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: 'pending',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComics.fulfilled, (state, action) => ({
                ...state,
                comics: action.payload,
                comic: null,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: 'success',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComics.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: 'rejected',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsByGenreLimit.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: 'pending',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsByGenreLimit.fulfilled, (state, action) => ({
                ...state,
                comics: action.payload?.rows,
                count: action.payload?.count,
                limit: action.payload?.limit,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: 'success',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsByGenreLimit.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: 'rejected',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'pending',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.fulfilled, (state, action) => ({
                ...state,
                comics: [action.payload, ...state.comics],
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'success',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.rejected, (state, action) => ({
                ...state,
                addComicMessage: action.payload,
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'rejected',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: 'pending',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.fulfilled, (state, action) => ({
                ...state,
                comic: action.payload,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: 'success',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: 'rejected',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'pending',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.fulfilled, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'success',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: action.payload,
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'rejected',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'pending',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.fulfilled, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'success',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'rejected',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(searchComic.pending, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: 'pending',
            }))
            .addCase(searchComic.fulfilled, (state, action) => ({
                ...state,
                searchComics: action.payload?.rows,
                searchCount: action.payload?.count,
                limit: action.payload?.limit,
                comic: null,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: 'success',
            }))
            .addCase(searchComic.rejected, (state, action) => ({
                ...state,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: action.payload,
                searchComicStatus: 'rejected',
            }));
    },
});

export const getComics = createAsyncThunk(GET_COMICS, async (payload, thunkAPI) => {
    try {
        const response = await apiGetComics();
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getComicsLimit = createAsyncThunk(GET_COMICS_LIMIT, async (page, thunkAPI) => {
    try {
        const response = await apiGetComicsLimit(page);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getComicsByGenreLimit = createAsyncThunk(GET_COMICS_BY_GENRE_LIMIT, async (data, thunkAPI) => {
    try {
        const response = await apiGetComicsByGenreLimit(data.page, data.limit, data.genre);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const searchComic = createAsyncThunk(SEARCH_COMIC, async (page, thunkAPI) => {
    try {
        const response = await apiSearchComic(page);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addComic = createAsyncThunk(ADD_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiCreateComic(payload);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleComic = createAsyncThunk(GET_SINGLE_COMIC, async (id, thunkAPI) => {
    try {
        const response = await apiGetSingleComic(id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateComic = createAsyncThunk(UPDATE_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiUpdateComic(payload.formData, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteComic = createAsyncThunk(DELETE_COMIC, async (id, thunkAPI) => {
    try {
        const response = await apiDeleteComic(id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default comicSlice.reducer;
