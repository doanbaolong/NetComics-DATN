import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetComics, apiCreateComic, apiGetSingleComic, apiUpdateComic, apiDeleteComic } from '~/services/comic';
import { GET_COMICS, ADD_COMIC, GET_SINGLE_COMIC, UPDATE_COMIC, DELETE_COMIC } from './constant';

export const comicSlice = createSlice({
    name: 'comic',
    initialState: {
        comics: [],
        comic: {},
        getComicsMessage: '',
        getSingleComicMessage: '',
        addComicMessage: '',
        updateComicMessage: '',
        deleteComicMessage: '',
        getComicsStatus: '',
        getSingleComicStatus: '',
        addComicStatus: '',
        updateComicStatus: '',
        deleteComicStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComics.pending, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: 'pending',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(getComics.fulfilled, (state, action) => ({
                ...state,
                comics: action.payload,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: 'success',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(getComics.rejected, (state, action) => ({
                ...state,
                getComicsMessage: action.payload,
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: 'rejected',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(addComic.pending, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'pending',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(addComic.fulfilled, (state, action) => ({
                ...state,
                comics: [action.payload, ...state.comics],
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'success',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(addComic.rejected, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: action.payload,
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: 'rejected',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(getSingleComic.pending, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: 'pending',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(getSingleComic.fulfilled, (state, action) => ({
                ...state,
                comic: action.payload,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: 'success',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(getSingleComic.rejected, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: action.payload,
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: 'rejected',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: '',
            }))
            .addCase(updateComic.pending, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'pending',
                deleteComicStatus: '',
            }))
            .addCase(updateComic.fulfilled, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'success',
                deleteComicStatus: '',
            }))
            .addCase(updateComic.rejected, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: action.payload,
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: 'rejected',
                deleteComicStatus: '',
            }))
            .addCase(deleteComic.pending, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'pending',
            }))
            .addCase(deleteComic.fulfilled, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: '',
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'success',
            }))
            .addCase(deleteComic.rejected, (state, action) => ({
                ...state,
                getComicsMessage: '',
                getSingleComicMessage: '',
                addComicMessage: '',
                updateComicMessage: '',
                deleteComicMessage: action.payload,
                getComicsStatus: '',
                getSingleComicStatus: '',
                addComicStatus: '',
                updateComicStatus: '',
                deleteComicStatus: 'rejected',
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
