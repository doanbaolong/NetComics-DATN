import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetNotifications } from '~/services/notify';
import { GET_NOTIFICATION } from './constant';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        unread: 0,
        getNotificationsMessage: '',
        getNotificationsStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state, action) => ({
                ...state,
                getNotificationsMessage: '',
                getNotificationsStatus: 'pending',
            }))
            .addCase(getNotifications.fulfilled, (state, action) => ({
                ...state,
                notifications: action.payload?.rows,
                unread: action.payload?.unread,
                getNotificationsMessage: '',
                getNotificationsStatus: 'success',
            }))
            .addCase(getNotifications.rejected, (state, action) => ({
                ...state,
                getNotificationsMessage: action.payload,
                getNotificationsStatus: 'rejected',
            }));
    },
});

export const getNotifications = createAsyncThunk(GET_NOTIFICATION, async (payload, thunkAPI) => {
    try {
        const response = await apiGetNotifications(payload.userId, payload.query);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default notificationSlice.reducer;
