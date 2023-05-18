import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCommentByChapter } from '~/services/comment';
import { GET_COMMENT_BY_CHAPTER } from './constant';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        commentCount: 0,
        commentLimit: 0,
        getCommentsByChapterMessage: '',
        getCommentsByChapterStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export const getCommentsByChapter = createAsyncThunk(GET_COMMENT_BY_CHAPTER, async (payload, thunkAPI) => {
    try {
        const response = await apiGetCommentByChapter(payload.query, payload.chapterId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default commentSlice.reducer;
