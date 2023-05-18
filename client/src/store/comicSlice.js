import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetComics,
    apiCreateComic,
    apiGetSingleComic,
    apiUpdateComic,
    apiDeleteComic,
    apiGetComicsLimit,
    apiGetSingleComicBySlug,
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
    GET_SINGLE_COMIC_BY_SLUG,
    GET_COMICS_BY_GENRE_LIMIT,
    SEARCH_COMIC,
} from './constant';

export const comicSlice = createSlice({
    name: 'comic',
    initialState: {
        comics: [],
        comic: null,
        count: 0,
        limit: 0,
        getComicsByGenreMessage: '',
        getComicsLimitMessage: '',
        getSingleComicMessage: '',
        getSingleComicBySlugMessage: '',
        addComicMessage: '',
        updateComicMessage: '',
        deleteComicMessage: '',
        getComicsByGenreStatus: '',
        getComicsLimitStatus: '',
        getSingleComicStatus: '',
        getSingleComicBySlugStatus: '',
        addComicStatus: '',
        updateComicStatus: '',
        deleteComicStatus: '',
        searchComicMessage: '',
        searchComicStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComicsLimit.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'pending',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
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
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'success',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsLimit.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: '',
                getComicsLimitStatus: 'rejected',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsByGenreLimit.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: 'pending',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
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
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: 'success',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getComicsByGenreLimit.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: 'rejected',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: 'pending',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.fulfilled, (state, action) => ({
                ...state,
                comics: [action.payload, ...state.comics],
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: 'success',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(addComic.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: action.payload,
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: 'rejected',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: 'pending',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.fulfilled, (state, action) => ({
                ...state,
                comic: action.payload,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: 'success',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComic.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: action.payload,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: 'rejected',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComicBySlug.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: 'pending',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComicBySlug.fulfilled, (state, action) => ({
                ...state,
                comic: action.payload,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: 'success',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(getSingleComicBySlug.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: action.payload,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: 'rejected',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: 'pending',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.fulfilled, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: 'success',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(updateComic.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: action.payload,
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: 'rejected',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'pending',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.fulfilled, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'success',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(deleteComic.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'rejected',
                searchComicMessage: '',
                searchComicStatus: '',
            }))
            .addCase(searchComics.pending, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: 'pending',
            }))
            .addCase(searchComics.fulfilled, (state, action) => ({
                ...state,
                comics: action.payload?.rows,
                count: action.payload?.count,
                limit: action.payload?.limit,
                comic: null,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
                searchComicMessage: '',
                searchComicStatus: 'success',
            }))
            .addCase(searchComics.rejected, (state, action) => ({
                ...state,
                getComicsByGenreMessage: '',
                getComicsLimitMessage: '',
                getSingleComicBySlugMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsByGenreStatus: '',
                getComicsLimitStatus: '',
                getSingleComicStatus: '',
                getSingleComicBySlugStatus: '',
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const searchComics = createAsyncThunk(SEARCH_COMIC, async (page, thunkAPI) => {
    try {
        const response = await apiSearchComic(page);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getSingleComicBySlug = createAsyncThunk(GET_SINGLE_COMIC_BY_SLUG, async (slug, thunkAPI) => {
    try {
        const response = await apiGetSingleComicBySlug(slug);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
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
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteComic = createAsyncThunk(DELETE_COMIC, async (id, thunkAPI) => {
    try {
        const response = await apiDeleteComic(id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default comicSlice.reducer;
