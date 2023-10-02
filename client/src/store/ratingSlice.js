import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetRatings } from '~/services/rating';
import { GET_RATING } from './constant';

export const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        ratings: [],
        getRatingsMessage: '',
        getRatingsStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRatings.pending, (state, action) => ({
                ...state,
                getRatingsMessage: '',
                getRatingsStatus: 'pending',
            }))
            .addCase(getRatings.fulfilled, (state, action) => ({
                ...state,
                Ratings: action.payload?.rows,
                getRatingsMessage: '',
                getRatingsStatus: 'success',
            }))
            .addCase(getRatings.rejected, (state, action) => ({
                ...state,
                getRatingsMessage: action.payload,
                getRatingsStatus: 'rejected',
            }));
    },
});

export const getRatings = createAsyncThunk(GET_RATING, async (payload, thunkAPI) => {
    try {
        const response = await apiGetRatings(payload.comicId, payload.query);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default ratingSlice.reducer;
