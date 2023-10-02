import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiChangePassword, apiGetUsers, apiLockUser, apiUpdateUser } from '~/services/user';
import { CHANGE_PASSWORD, GET_USERS, LOCK_USER, UPDATE_USER } from './constant';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        getUsersMessage: '',
        lockUserMessage: '',
        getUsersStatus: '',
        lockUserStatus: '',
        updateUserMessage: '',
        updateUserStatus: '',
        changePasswordMessage: '',
        changePasswordStatus: '',
    },
    reducers: {
        reset: (state, action) => ({
            ...state,
            users: [],
            currentUser: {},
            getUsersMessage: '',
            lockUserMessage: '',
            getUsersStatus: '',
            lockUserStatus: '',
            updateUserMessage: '',
            updateUserStatus: '',
            changePasswordMessage: '',
            changePasswordStatus: '',
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: 'pending',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(getUsers.fulfilled, (state, action) => ({
                ...state,
                users: action.payload,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: 'success',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(getUsers.rejected, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: 'rejected',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(lockUser.pending, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: 'pending',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(lockUser.fulfilled, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: 'success',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(lockUser.rejected, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: action.payload,
                getUsersStatus: '',
                lockUserStatus: 'rejected',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(updateUser.pending, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: 'pending',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(updateUser.fulfilled, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: 'success',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(updateUser.rejected, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: action.payload,
                updateUserStatus: 'rejected',
                changePasswordMessage: '',
                changePasswordStatus: '',
            }))
            .addCase(changePassword.pending, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: 'pending',
            }))
            .addCase(changePassword.fulfilled, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: '',
                changePasswordStatus: 'success',
            }))
            .addCase(changePassword.rejected, (state, action) => ({
                ...state,
                getUsersMessage: '',
                lockUserMessage: '',
                getUsersStatus: '',
                lockUserStatus: '',
                updateUserMessage: '',
                updateUserStatus: '',
                changePasswordMessage: action.payload,
                changePasswordStatus: 'rejected',
            }));
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
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk(UPDATE_USER, async (payload, thunkAPI) => {
    try {
        const response = await apiUpdateUser(payload.formData, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const changePassword = createAsyncThunk(CHANGE_PASSWORD, async (payload, thunkAPI) => {
    try {
        const response = await apiChangePassword(payload.passwords, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const lockUser = createAsyncThunk(LOCK_USER, async (payload, thunkAPI) => {
    try {
        const response = await apiLockUser(payload.data, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});
export default userSlice.reducer;
