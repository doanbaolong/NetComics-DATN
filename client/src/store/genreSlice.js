import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetGenres } from '~/services/genre';
import { GET_GENRES } from './constant';

export const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        message: '',
        genres: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.message = action.payload;
            });
    },
});

export const getGenres = createAsyncThunk(GET_GENRES, async (payload, thunkAPI) => {
    try {
        const response = await apiGetGenres(payload);
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

export default genreSlice.reducer;
