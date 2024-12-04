import { configureStore } from '@reduxjs/toolkit';
import addBlogReducer from './addBlogSlice';

const store = configureStore({
    reducer: {
        blog: addBlogReducer
    }
})

export default store;