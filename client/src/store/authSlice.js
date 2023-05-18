import jwt_decode from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCurrentUser, apiLogIn, apiSignUp, apiVerifyEmail } from '~/services/auth';
import { GET_CURRENT_USER, LOG_IN, SIGN_UP, VERIFY_EMAIL } from './constant';
import { apiGetCurrentAdmin, apiAdminSignUp, apiAdminLogIn } from '~/services/admin';
import { GET_CURRENT_ADMIN, ADMIN_LOG_IN, ADMIN_SIGN_UP } from './constant';
export const authSlide = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        role: '',
        message: '',
        currentUser: null,
        currentAdmin: null,
        signUpStatus: '',
        logInStatus: '',
        getCurrentUserStatus: '',
        getCurrentAdminStatus: '',
        verifyEmailMessage: '',
        verifyEmailStatus: '',
    },
    reducers: {
        logOut: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.role = '';
            state.message = '';
            state.currentUser = null;
            state.currentAdmin = null;
            state.signUpStatus = '';
            state.logInStatus = '';
            state.getCurrentUserStatus = '';
            state.getCurrentAdminStatus = '';
            state.verifyEmailMessage = '';
            state.verifyEmailStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = 'pending';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.currentUser = action.payload.user;
                state.role = action.payload.user.role;
                state.currentAdmin = null;
                state.message = '';
                state.signUpStatus = 'success';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = 'rejected';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(verifyEmail.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = 'pending';
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.currentUser = action.payload.user;
                state.role = action.payload.user.role;
                state.currentAdmin = null;
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = 'success';
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = action.payload;
                state.verifyEmailStatus = 'rejected';
            })
            .addCase(logIn.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = 'pending';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.currentUser = action.payload.user;
                state.role = action.payload.user.role;
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = 'success';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(logIn.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = '';
                state.logInStatus = 'rejected';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(adminLogIn.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = 'pending';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(adminLogIn.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.currentUser = null;
                state.currentAdmin = action.payload.admin;
                state.role = action.payload.admin.role;
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = 'success';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(adminLogIn.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = '';
                state.logInStatus = 'rejected';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentUser.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = 'pending';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentUser = action.payload;
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = 'success';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = 'rejected';
                state.getCurrentAdminStatus = '';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentAdmin.pending, (state, action) => {
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = 'pending';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentAdmin.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.currentAdmin = action.payload;
                state.message = '';
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = 'success';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            })
            .addCase(getCurrentAdmin.rejected, (state, action) => {
                state.message = action.payload;
                state.signUpStatus = '';
                state.logInStatus = '';
                state.getCurrentUserStatus = '';
                state.getCurrentAdminStatus = 'rejected';
                state.verifyEmailMessage = '';
                state.verifyEmailStatus = '';
            });
    },
});

export const signUp = createAsyncThunk(SIGN_UP, async (payload, thunkAPI) => {
    try {
        const response = await apiSignUp(payload);
        if (response?.data.err === 0) {
            const token = response?.data.token;
            const user = jwt_decode(token);
            return { token, user };
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const verifyEmail = createAsyncThunk(VERIFY_EMAIL, async (emailToken, thunkAPI) => {
    try {
        const response = await apiVerifyEmail(emailToken);
        if (response?.data.err === 0) {
            const token = response?.data.token;
            const user = jwt_decode(token);
            return { token, user };
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logIn = createAsyncThunk(LOG_IN, async (payload, thunkAPI) => {
    try {
        const response = await apiLogIn(payload);
        if (response?.data.err === 0) {
            const token = response?.data.token;
            const user = jwt_decode(token);
            return { token, user };
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCurrentUser = createAsyncThunk(GET_CURRENT_USER, async (payload, thunkAPI) => {
    try {
        const response = await apiGetCurrentUser();
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            thunkAPI.dispatch(authSlide.actions.logOut());
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        thunkAPI.dispatch(authSlide.actions.logOut());
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const adminSignUp = createAsyncThunk(ADMIN_SIGN_UP, async (payload, thunkAPI) => {
    try {
        const response = await apiAdminSignUp(payload);
        if (response?.data.err === 0) {
            const token = response?.data.token;
            const admin = jwt_decode(token);
            return { token, admin };
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const adminLogIn = createAsyncThunk(ADMIN_LOG_IN, async (payload, thunkAPI) => {
    try {
        const response = await apiAdminLogIn(payload);
        if (response?.data.err === 0) {
            const token = response?.data.token;
            const admin = jwt_decode(token);
            return { token, admin };
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCurrentAdmin = createAsyncThunk(GET_CURRENT_ADMIN, async (payload, thunkAPI) => {
    try {
        const response = await apiGetCurrentAdmin();
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            thunkAPI.dispatch(authSlide.actions.logOut());
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        thunkAPI.dispatch(authSlide.actions.logOut());
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default authSlide.reducer;
