import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiAddHistoryComic,
    apiDeleteHistoryComic,
    apiGetHistoryComicsByUser,
    apiGetHistoryComicsByComicIds,
} from '~/services/history';
import {
    GET_HISTORY_COMICS,
    ADD_HISTORY_COMIC,
    DELETE_HISTORY_COMIC,
    GET_HISTORY_COMICS_BY_COMIC_IDS,
} from './constant';

export const historySlice = createSlice({
    name: 'following_comic',
    initialState: {
        histories: [],
        historyCount: 0,
        historyLimit: 0,
        getHistoryComicsMessage: '',
        addHistoryComicMessage: '',
        deleteHistoryComicMessage: '',
        getHistoryComicsStatus: '',
        addHistoryComicStatus: '',
        deleteHistoryComicStatus: '',
        getHistoryComicsByComicIdsMessage: '',
        getHistoryComicsByComicIdsStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistoryComics.pending, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: 'pending',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComics.fulfilled, (state, action) => ({
                ...state,
                histories: action.payload?.rows,
                historyCount: action.payload?.count,
                historyLimit: action.payload?.limit,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: 'success',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComics.rejected, (state, action) => ({
                ...state,
                getHistoryComicsMessage: action.payload,
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: 'rejected',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.pending, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'pending',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.fulfilled, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'success',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.rejected, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: action.payload,
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'rejected',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.pending, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'pending',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.fulfilled, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'success',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.rejected, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: action.payload,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'rejected',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComicsByComicIds.pending, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: 'pending',
            }))
            .addCase(getHistoryComicsByComicIds.fulfilled, (state, action) => ({
                ...state,
                histories: action.payload?.rows,
                historyCount: action.payload?.count,
                historyLimit: action.payload?.limit,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: '',
                getHistoryComicsByComicIdsStatus: 'success',
            }))
            .addCase(getHistoryComicsByComicIds.rejected, (state, action) => ({
                ...state,
                getHistoryComicsMessage: '',
                addHistoryComicMessage: '',
                deleteHistoryComicMessage: '',
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsMessage: action.payload,
                getHistoryComicsByComicIdsStatus: 'rejected',
            }));
    },
});

export const getHistoryComics = createAsyncThunk(GET_HISTORY_COMICS, async (payload, thunkAPI) => {
    try {
        const response = await apiGetHistoryComicsByUser(payload.query, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getHistoryComicsByComicIds = createAsyncThunk(GET_HISTORY_COMICS_BY_COMIC_IDS, async (query, thunkAPI) => {
    try {
        const response = await apiGetHistoryComicsByComicIds(query);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addHistoryComic = createAsyncThunk(ADD_HISTORY_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiAddHistoryComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteHistoryComic = createAsyncThunk(DELETE_HISTORY_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiDeleteHistoryComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default historySlice.reducer;
