import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetUsers } from '~/services/user';
import { GET_USERS } from './constant';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        message: '',
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.message = action.payload;
            });
    },
});

export const getUsers = createAsyncThunk(GET_USERS, async (payload, thunkAPI) => {
    try {
        const response = await apiGetUsers(payload);
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
export default userSlice.reducer;
