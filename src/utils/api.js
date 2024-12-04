// src/utils/api.js
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ;

export const API_ENDPOINTS = {
    ADD_BLOG: "/api/blog/addBlog",
    GET_BLOGS: "/api/blog/getblog",
    GET_SINGLE_BLOG: (id) => `/api/blog/getblogs/${id}`,
};
