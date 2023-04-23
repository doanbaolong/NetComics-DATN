import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetGenres, apiCreateGenre, apiGetSingleGenre, apiUpdateGenre, apiDeleteGenre } from '~/services/genre';
import { GET_GENRES, ADD_GENRE, GET_SINGLE_GENRE, UPDATE_GENRE, DELETE_GENRE } from './constant';

export const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        genres: [],
        genre: {},
        getGenresMessage: '',
        getSingleGenreMessage: '',
        addGenreMessage: '',
        updateGenreMessage: '',
        deleteGenreMessage: '',
        getGenresStatus: '',
        getSingleGenreStatus: '',
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
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'pending',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getGenres.fulfilled, (state, action) => ({
                ...state,
                genres: action.payload,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'success',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getGenres.rejected, (state, action) => ({
                ...state,
                getGenresMessage: action.payload,
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: 'rejected',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: 'pending',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.fulfilled, (state, action) => ({
                ...state,
                genres: [action.payload, ...state.genres],
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: 'success',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(addGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: action.payload,
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: 'rejected',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'pending',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.fulfilled, (state, action) => ({
                ...state,
                genre: action.payload,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'success',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(getSingleGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: action.payload,
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: 'rejected',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'pending',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.fulfilled, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'success',
                deleteGenreStatus: '',
            }))
            .addCase(updateGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: action.payload,
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: 'rejected',
                deleteGenreStatus: '',
            }))
            .addCase(deleteGenre.pending, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: 'pending',
            }))
            .addCase(deleteGenre.fulfilled, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: '',
                getGenresStatus: '',
                getSingleGenreStatus: '',
                addGenreStatus: '',
                updateGenreStatus: '',
                deleteGenreStatus: 'success',
            }))
            .addCase(deleteGenre.rejected, (state, action) => ({
                ...state,
                getGenresMessage: '',
                getSingleGenreMessage: '',
                addGenreMessage: '',
                updateGenreMessage: '',
                deleteGenreMessage: action.payload,
                getGenresStatus: '',
                getSingleGenreStatus: '',
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
