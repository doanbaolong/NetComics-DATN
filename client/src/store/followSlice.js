import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiAddFollowingComic,
    apiDeleteFollowingComic,
    apiGetCountFollow,
    apiGetFollowingComicsByComicIds,
    apiGetFollowingComicsByUser,
} from '~/services/follow';
import {
    GET_FOLLOWING_COMICS,
    ADD_FOLLOWING_COMIC,
    DELETE_FOLLOWING_COMIC,
    GET_COUNT_FOLLOW,
    GET_FOLLOWING_COMICS_BY_IDS,
} from './constant';

export const followSlice = createSlice({
    name: 'following_comic',
    initialState: {
        followingComics: [],
        followers: 0,
        followCount: 0,
        followLimit: 0,
        getFollowingComicsStatus: '',
        addFollowingComicStatus: '',
        deleteFollowingComicStatus: '',
        getFollowingComicsByIdsStatus: '',
        getCountFollowStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFollowingComics.pending, (state, action) => ({
                ...state,
                getFollowingComicsStatus: 'pending',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(getFollowingComics.fulfilled, (state, action) => ({
                ...state,
                followingComics: action.payload?.rows,
                followCount: action.payload?.count,
                followLimit: action.payload?.limit,
                getFollowingComicsStatus: 'success',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(getFollowingComics.rejected, (state, action) => ({
                ...state,
                getFollowingComicsStatus: 'rejected',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(addFollowingComic.pending, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'pending',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(addFollowingComic.fulfilled, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'success',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(addFollowingComic.rejected, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'rejected',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(deleteFollowingComic.pending, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'pending',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(deleteFollowingComic.fulfilled, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'success',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(deleteFollowingComic.rejected, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'rejected',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: '',
            }))
            .addCase(getCountFollow.pending, (state, action) => ({
                ...state,
                followers: action.payload,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: 'pending',
            }))
            .addCase(getCountFollow.fulfilled, (state, action) => ({
                ...state,
                followers: action.payload,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: 'success',
            }))
            .addCase(getCountFollow.rejected, (state, action) => ({
                ...state,
                followers: 0,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: '',
                getCountFollowStatus: 'rejected',
            }))
            .addCase(getFollowingComicsByComicIds.pending, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: 'pending',
                getCountFollowStatus: '',
            }))
            .addCase(getFollowingComicsByComicIds.fulfilled, (state, action) => ({
                ...state,
                followingComics: action.payload?.rows,
                followCount: action.payload?.count,
                followLimit: action.payload?.limit,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: 'success',
                getCountFollowStatus: '',
            }))
            .addCase(getFollowingComicsByComicIds.rejected, (state, action) => ({
                ...state,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsStatus: 'rejected',
                getCountFollowStatus: '',
            }));
    },
});

export const getFollowingComics = createAsyncThunk(GET_FOLLOWING_COMICS, async (payload, thunkAPI) => {
    try {
        const response = await apiGetFollowingComicsByUser(payload.query, payload.id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getFollowingComicsByComicIds = createAsyncThunk(GET_FOLLOWING_COMICS_BY_IDS, async (query, thunkAPI) => {
    try {
        const response = await apiGetFollowingComicsByComicIds(query);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getCountFollow = createAsyncThunk(GET_COUNT_FOLLOW, async (id, thunkAPI) => {
    try {
        const response = await apiGetCountFollow(id);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const addFollowingComic = createAsyncThunk(ADD_FOLLOWING_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiAddFollowingComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteFollowingComic = createAsyncThunk(DELETE_FOLLOWING_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiDeleteFollowingComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export default followSlice.reducer;
