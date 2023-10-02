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
        getHistoryComicsStatus: '',
        addHistoryComicStatus: '',
        deleteHistoryComicStatus: '',
        getHistoryComicsByComicIdsStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistoryComics.pending, (state, action) => ({
                ...state,
                getHistoryComicsStatus: 'pending',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComics.fulfilled, (state, action) => ({
                ...state,
                histories: action.payload?.rows,
                historyCount: action.payload?.count,
                historyLimit: action.payload?.limit,
                getHistoryComicsStatus: 'success',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComics.rejected, (state, action) => ({
                ...state,
                getHistoryComicsStatus: 'rejected',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.pending, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'pending',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.fulfilled, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'success',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(addHistoryComic.rejected, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: 'rejected',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.pending, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'pending',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.fulfilled, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'success',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(deleteHistoryComic.rejected, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: 'rejected',
                getHistoryComicsByComicIdsStatus: '',
            }))
            .addCase(getHistoryComicsByComicIds.pending, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: 'pending',
            }))
            .addCase(getHistoryComicsByComicIds.fulfilled, (state, action) => ({
                ...state,
                histories: action.payload?.rows,
                historyCount: action.payload?.count,
                historyLimit: action.payload?.limit,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
                getHistoryComicsByComicIdsStatus: 'success',
            }))
            .addCase(getHistoryComicsByComicIds.rejected, (state, action) => ({
                ...state,
                getHistoryComicsStatus: '',
                addHistoryComicStatus: '',
                deleteHistoryComicStatus: '',
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
        return thunkAPI.rejectWithValue(error.response.data.msg);
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
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addHistoryComic = createAsyncThunk(ADD_HISTORY_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiAddHistoryComic(
            payload.userId,
            payload.comicId,
            payload.chapterIds,
            payload.chapterId,
        );
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteHistoryComic = createAsyncThunk(DELETE_HISTORY_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiDeleteHistoryComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default historySlice.reducer;
