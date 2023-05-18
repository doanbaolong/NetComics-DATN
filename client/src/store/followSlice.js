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
        getFollowingComicsMessage: '',
        addFollowingComicMessage: '',
        deleteFollowingComicMessage: '',
        getFollowingComicsStatus: '',
        addFollowingComicStatus: '',
        deleteFollowingComicStatus: '',
        getFollowingComicsByIdsMessage: '',
        getFollowingComicsByIdsStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFollowingComics.pending, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: 'pending',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(getFollowingComics.fulfilled, (state, action) => ({
                ...state,
                followingComics: action.payload?.rows,
                followCount: action.payload?.count,
                followLimit: action.payload?.limit,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: 'success',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(getFollowingComics.rejected, (state, action) => ({
                ...state,
                getFollowingComicsMessage: action.payload,
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: 'rejected',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(addFollowingComic.pending, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'pending',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(addFollowingComic.fulfilled, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'success',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(addFollowingComic.rejected, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: action.payload,
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: 'rejected',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(deleteFollowingComic.pending, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'pending',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(deleteFollowingComic.fulfilled, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'success',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(deleteFollowingComic.rejected, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: action.payload,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: 'rejected',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(getCountFollow.fulfilled, (state, action) => ({
                ...state,
                followers: action.payload,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(getCountFollow.rejected, (state, action) => ({
                ...state,
                followers: 0,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: action.payload,
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: '',
            }))
            .addCase(getFollowingComicsByComicIds.pending, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: 'pending',
            }))
            .addCase(getFollowingComicsByComicIds.fulfilled, (state, action) => ({
                ...state,
                followingComics: action.payload?.rows,
                followCount: action.payload?.count,
                followLimit: action.payload?.limit,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: '',
                getFollowingComicsByIdsStatus: 'success',
            }))
            .addCase(getFollowingComicsByComicIds.rejected, (state, action) => ({
                ...state,
                getFollowingComicsMessage: '',
                addFollowingComicMessage: '',
                deleteFollowingComicMessage: '',
                getFollowingComicsStatus: '',
                addFollowingComicStatus: '',
                deleteFollowingComicStatus: '',
                getFollowingComicsByIdsMessage: action.payload,
                getFollowingComicsByIdsStatus: 'rejected',
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
        return thunkAPI.rejectWithValue(error.response.data);
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
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCountFollow = createAsyncThunk(GET_COUNT_FOLLOW, async (slug, thunkAPI) => {
    try {
        const response = await apiGetCountFollow(slug);
        if (response?.data.err === 0) {
            return response.data.response;
        } else {
            return thunkAPI.rejectWithValue(response.data.msg);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
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
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteFollowingComic = createAsyncThunk(DELETE_FOLLOWING_COMIC, async (payload, thunkAPI) => {
    try {
        const response = await apiDeleteFollowingComic(payload.userId, payload.comicId);
        if (response?.data.err === 0) {
            return response.data.response;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export default followSlice.reducer;
