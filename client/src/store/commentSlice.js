import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCommentByChapter, apiGetCommentByComic } from '~/services/comment';
import { GET_COMMENT_BY_CHAPTER, GET_COMMENT_BY_COMIC } from './constant';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        commentCount: 0,
        commentLimit: 0,
        getCommentsByComicMessage: '',
        getCommentsByComicStatus: '',
        getCommentsByChapterMessage: '',
        getCommentsByChapterStatus: '',
    },
    reducers: {
        reset: (state, action) => ({
            ...state,
            comments: [],
            commentCount: 0,
            commentLimit: 0,
            getCommentsByComicMessage: '',
            getCommentsByComicStatus: '',
            getCommentsByChapterMessage: '',
            getCommentsByChapterStatus: '',
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsByComic.pending, (state, action) => ({
                ...state,
                getCommentsByComicMessage: '',
                getCommentsByComicStatus: 'pending',
            }))
            .addCase(getCommentsByComic.fulfilled, (state, action) => ({
                ...state,
                comments: action.payload?.rows,
                commentCount: action.payload?.count,
                commentLimit: action.payload?.limit,
                getCommentsByComicMessage: '',
                getCommentsByComicStatus: 'success',
            }))
            .addCase(getCommentsByComic.rejected, (state, action) => ({
                ...state,
                getCommentsByComicMessage: action.payload,
                getCommentsByComicStatus: 'rejected',
            }))
            .addCase(getCommentsByChapter.pending, (state, action) => ({
                ...state,
                getCommentsByChapterMessage: '',
                getCommentsByChapterStatus: 'pending',
            }))
            .addCase(getCommentsByChapter.fulfilled, (state, action) => ({
                ...state,
                comments: action.payload?.rows,
                commentCount: action.payload?.count,
                commentLimit: action.payload?.limit,
                getCommentsByChapterMessage: '',
                getCommentsByChapterStatus: 'success',
            }))
            .addCase(getCommentsByChapter.rejected, (state, action) => ({
                ...state,
                getCommentsByChapterMessage: action.payload,
                getCommentsByChapterStatus: 'rejected',
            }));
    },
});

export const getCommentsByComic = createAsyncThunk(GET_COMMENT_BY_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiGetCommentByComic(payload.query, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getCommentsByChapter = createAsyncThunk(GET_COMMENT_BY_CHAPTER, async (payload, thunkAPI) => {
    try {
        const response = await apiGetCommentByChapter(payload.query, payload.chapterId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default commentSlice.reducer;
