import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from '../utils/status';
import axios from 'axios';

const initialState = {
    blogs: [],
    singleBlog: null,
    blogsStatus: STATUS.IDLE,
    singleBlogStatus: STATUS.IDLE,
    error: null, // For general errors
    singleBlogError: null, // For single blog-specific errors
};


// Add Blog Data (POST)
export const sendBlog = createAsyncThunk('blog/sendapi', async (blogData) => {
    const response = await axios.post('https://blog-backend-2-qz6x.onrender.com/api/blog/addBlog', blogData);
    return response.data;
});

// Fetch Blog Data (GET)
// Ensure this URL is correct
export const getBlog = createAsyncThunk('blog/getapi', async () => {
    const response = await axios.get('https://blog-backend-2-qz6x.onrender.com/api/blog/getblog', {
        withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
});

// Fetch Single Blog Data (GET)
export const getSingleBlog = createAsyncThunk('blog/getsingleapi', async (id) => {
    const response = await axios.get(`https://blog-backend-2-qz6x.onrender.com/api/blog/getblogs/${id}`, {
        withCredentials: true,
    });
    // console.log( response.data.data)
    return response.data.data;
});


const addBlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Blog
            .addCase(sendBlog.pending, (state) => {
                state.blogsStatus = STATUS.LOADING;
            })
            .addCase(sendBlog.fulfilled, (state, action) => {
                state.blogsStatus = STATUS.SUCCESS;
                state.blogs.push(action.payload);
            })
            .addCase(sendBlog.rejected, (state) => {
                state.blogsStatus = STATUS.FAILED;
            })

            // Fetch Blogs
            .addCase(getBlog.pending, (state) => {
                state.blogsStatus = STATUS.LOADING;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.blogsStatus = STATUS.SUCCESS;
                state.blogs = action.payload;
            })
            .addCase(getBlog.rejected, (state) => {
                state.blogsStatus = STATUS.FAILED;
            })

            // Fetch Single Blog
            .addCase(getSingleBlog.pending, (state) => {
                state.singleBlogStatus = STATUS.LOADING;
            })
            .addCase(getSingleBlog.fulfilled, (state, action) => {
                state.singleBlogStatus = STATUS.SUCCESS;
                state.singleBlog = action.payload;
            })
            .addCase(getSingleBlog.rejected, (state) => {
                state.singleBlogStatus = STATUS.FAILED;
            });
    },
});


export const getAllBlogs = (state) => state.blog.blogs;
export const getSingleBlogs = (state) => state.blog.singleBlog;
export default addBlogSlice.reducer;
