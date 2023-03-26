import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogIn, apiSignUp } from '~/services/auth';
import { LOG_IN, SIGN_UP } from './constant';

export const authSlide = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        message: '',
    },
    reducers: {
        logOut: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoggedIn = true;
                state.token = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoggedIn = true;
                state.token = action.payload;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.message = action.payload;
            });
    },
});

export const signUp = createAsyncThunk(SIGN_UP, async (payload, thunkAPI) => {
    try {
        const response = await apiSignUp(payload);
        console.log(response);
        if (response?.data.err === 0) {
            return response.data.token;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logIn = createAsyncThunk(LOG_IN, async (payload, thunkAPI) => {
    try {
        const response = await apiLogIn(payload);
        console.log(response);
        if (response?.data.err === 0) {
            return response.data.token;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        console.log('Error', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default authSlide.reducer;
