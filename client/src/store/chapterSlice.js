import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCreateChapter, apiDeleteChapter, apiGetSingleChapter, apiUpdateChapter } from '~/services/chapter';
import { GET_CHAPTERS, ADD_CHAPTER, GET_SINGLE_CHAPTER, UPDATE_CHAPTER, DELETE_CHAPTER } from './constant';

export const chapterSlice = createSlice({
    name: 'chapter',
    initialState: {
        chapters: [],
        chapter: {},
        addChapterMessage: '',
        updateChapterMessage: '',
        deleteChapterMessage: '',
        getChaptersStatus: '',
        getSingleChapterStatus: '',
        addChapterStatus: '',
        updateChapterStatus: '',
        deleteChapterStatus: '',
    },
    reducers: {
        reset: (state, action) => ({
            ...state,
            chapters: [],
            chapter: {},
            addChapterMessage: '',
            updateChapterMessage: '',
            deleteChapterMessage: '',
            getChaptersStatus: '',
            getSingleChapterStatus: '',
            addChapterStatus: '',
            updateChapterStatus: '',
            deleteChapterStatus: '',
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChapters.pending, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: 'pending',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(getChapters.fulfilled, (state, action) => ({
                ...state,
                chapters: action.payload,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: 'success',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(getChapters.rejected, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: 'rejected',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(addChapter.pending, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: 'pending',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(addChapter.fulfilled, (state, action) => ({
                ...state,
                chapters: [action.payload, ...state.chapters],
                chapter: action.payload,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: 'success',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(addChapter.rejected, (state, action) => ({
                ...state,
                addChapterMessage: action.payload,
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: 'rejected',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(getSingleChapter.pending, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: 'pending',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(getSingleChapter.fulfilled, (state, action) => ({
                ...state,
                chapter: action.payload,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: 'success',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(getSingleChapter.rejected, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: 'rejected',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: '',
            }))
            .addCase(updateChapter.pending, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: 'pending',
                deleteChapterStatus: '',
            }))
            .addCase(updateChapter.fulfilled, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: 'success',
                deleteChapterStatus: '',
            }))
            .addCase(updateChapter.rejected, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: action.payload,
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: 'rejected',
                deleteChapterStatus: '',
            }))
            .addCase(deleteChapter.pending, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: 'pending',
            }))
            .addCase(deleteChapter.fulfilled, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: '',
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: 'success',
            }))
            .addCase(deleteChapter.rejected, (state, action) => ({
                ...state,
                addChapterMessage: '',
                updateChapterMessage: '',
                deleteChapterMessage: action.payload,
                getChaptersStatus: '',
                getSingleChapterStatus: '',
                addChapterStatus: '',
                updateChapterStatus: '',
                deleteChapterStatus: 'rejected',
            }));
    },
});

export const getChapters = createAsyncThunk(GET_CHAPTERS, async (payload, thunkAPI) => {
    try {
        const response = await apiCreateChapter(payload);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addChapter = createAsyncThunk(ADD_CHAPTER, async (payload, thunkAPI) => {
    try {
        const response = await apiCreateChapter(payload);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleChapter = createAsyncThunk(GET_SINGLE_CHAPTER, async (id, thunkAPI) => {
    try {
        const response = await apiGetSingleChapter(id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateChapter = createAsyncThunk(UPDATE_CHAPTER, async (payload, thunkAPI) => {
    try {
        const response = await apiUpdateChapter(payload.formData, payload.chapterId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteChapter = createAsyncThunk(DELETE_CHAPTER, async (id, thunkAPI) => {
    try {
        const response = await apiDeleteChapter(id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default chapterSlice.reducer;
