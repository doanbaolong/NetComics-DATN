import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetAuthors,
    apiCreateAuthor,
    apiGetSingleAuthor,
    apiUpdateAuthor,
    apiDeleteAuthor,
} from '~/services/author';
import { GET_AUTHORS, ADD_AUTHOR, GET_SINGLE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from './constant';

export const authorSlice = createSlice({
    name: 'author',
    initialState: {
        authors: [],
        author: {},
        addAuthorMessage: '',
        updateAuthorMessage: '',
        deleteAuthorMessage: '',
        getAuthorsStatus: '',
        getSingleAuthorStatus: '',
        addAuthorStatus: '',
        updateAuthorStatus: '',
        deleteAuthorStatus: '',
    },
    reducers: {
        reset: (state, action) => ({
            ...state,
            addAuthorMessage: '',
            updateAuthorMessage: '',
            deleteAuthorMessage: '',
            getAuthorsStatus: '',
            getSingleAuthorStatus: '',
            addAuthorStatus: '',
            updateAuthorStatus: '',
            deleteAuthorStatus: '',
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthors.pending, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: 'pending',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(getAuthors.fulfilled, (state, action) => ({
                ...state,
                authors: action.payload,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: 'success',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(getAuthors.rejected, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: 'rejected',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(addAuthor.pending, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: 'pending',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(addAuthor.fulfilled, (state, action) => ({
                ...state,
                authors: [action.payload, ...state.authors],
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: 'success',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(addAuthor.rejected, (state, action) => ({
                ...state,
                addAuthorMessage: action.payload,
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: 'rejected',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(getSingleAuthor.pending, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: 'pending',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(getSingleAuthor.fulfilled, (state, action) => ({
                ...state,
                author: action.payload,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: 'success',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(getSingleAuthor.rejected, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: 'rejected',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: '',
            }))
            .addCase(updateAuthor.pending, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: 'pending',
                deleteAuthorStatus: '',
            }))
            .addCase(updateAuthor.fulfilled, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: 'success',
                deleteAuthorStatus: '',
            }))
            .addCase(updateAuthor.rejected, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: action.payload,
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: 'rejected',
                deleteAuthorStatus: '',
            }))
            .addCase(deleteAuthor.pending, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: 'pending',
            }))
            .addCase(deleteAuthor.fulfilled, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: '',
                deleteAuthorStatus: 'success',
            }))
            .addCase(deleteAuthor.rejected, (state, action) => ({
                ...state,
                addAuthorMessage: '',
                updateAuthorMessage: '',
                deleteAuthorMessage: action.payload,
                getAuthorsStatus: '',
                getSingleAuthorStatus: '',
                addAuthorStatus: '',
                updateAuthorStatus: '',
                deleteAuthorStatus: 'rejected',
            }));
    },
});

export const getAuthors = createAsyncThunk(GET_AUTHORS, async (payload, thunkAPI) => {
    try {
        const response = await apiGetAuthors();
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addAuthor = createAsyncThunk(ADD_AUTHOR, async (payload, thunkAPI) => {
    try {
        const response = await apiCreateAuthor(payload);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleAuthor = createAsyncThunk(GET_SINGLE_AUTHOR, async (id, thunkAPI) => {
    try {
        const response = await apiGetSingleAuthor(id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateAuthor = createAsyncThunk(UPDATE_AUTHOR, async (payload, thunkAPI) => {
    try {
        const response = await apiUpdateAuthor(payload.author, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteAuthor = createAsyncThunk(DELETE_AUTHOR, async (id, thunkAPI) => {
    try {
        const response = await apiDeleteAuthor(id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default authorSlice.reducer;
