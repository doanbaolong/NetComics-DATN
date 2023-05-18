import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetGenres,
    apiCreateGenre,
    apiGetSingleGenre,
    apiUpdateGenre,
    apiDeleteGenre,
    apiGetSingleGenreBySlug,
} from '~/services/genre';
import {
    GET_GENRES,
    ADD_GENRE,
    GET_SINGLE_GENRE,
    UPDATE_GENRE,
    DELETE_GENRE,
    GET_SINGLE_GENRE_BY_SLUG,
} from './constant';

export const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        genres: [],
        genre: {},
        getGenresMessage: '',
        getSingleGenreMessage: '',
        getSingleGenreBySlugMessage: '',
        addGenreMessage: '',
        updateGenreMessage: '',
        deleteGenreMessage: '',
        getGenresStatus: '',
        getSingleGenreStatus: '',
        getSingleGenreBySlugStatus: '',
        addGenreStatus: '',
        updateGenreStatus: '',
        deleteGenreStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'pending',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getGenres.fulfilled, (state, action) => ({
                ...state,
                genres: action.payload,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'success',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getGenres.rejected, (state, action) => ({
                ...state,
                getGenresMessage: action.payload,
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'rejected',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: 'pending',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.fulfilled, (state, action) => ({
                ...state,
                genres: [action.payload, ...state.genres],
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: 'success',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: action.payload,
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: 'rejected',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'pending',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.fulfilled, (state, action) => ({
                ...state,
                genre: action.payload,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'success',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: action.payload,
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'rejected',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenreBySlug.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: 'pending',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenreBySlug.fulfilled, (state, action) => ({
                ...state,
                genre: action.payload,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: 'success',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenreBySlug.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: action.payload,
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: 'rejected',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'pending',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.fulfilled, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'success',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: action.payload,
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'rejected',
                deleteGenreStatus: '',
            }))
            .addCase(deleteGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: 'pending',
            }))
            .addCase(deleteGenre.fulfilled, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: 'success',
            }))
            .addCase(deleteGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                getSingleGenreBySlugMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: action.payload,
                getGenresStatus: '',
                getSingleGenreStatus: '',
                getSingleGenreBySlugStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: 'rejected',
            }));
    },
});

export const getGenres = createAsyncThunk(GET_GENRES, async (payload, thunkAPI) => {
    try {
        const response = await apiGetGenres();
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

export const addGenre = createAsyncThunk(ADD_GENRE, async (payload, thunkAPI) => {
    try {
        const response = await apiCreateGenre(payload);
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

export const getSingleGenre = createAsyncThunk(GET_SINGLE_GENRE, async (id, thunkAPI) => {
    try {
        const response = await apiGetSingleGenre(id);
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

export const getSingleGenreBySlug = createAsyncThunk(GET_SINGLE_GENRE_BY_SLUG, async (slug, thunkAPI) => {
    try {
        const response = await apiGetSingleGenreBySlug(slug);
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

export const updateGenre = createAsyncThunk(UPDATE_GENRE, async (payload, thunkAPI) => {
    try {
        const response = await apiUpdateGenre(payload.genre, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteGenre = createAsyncThunk(DELETE_GENRE, async (id, thunkAPI) => {
    try {
        const response = await apiDeleteGenre(id);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default genreSlice.reducer;
