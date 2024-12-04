import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getBlog } from "../../store/addBlogSlice";
import { useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function Dashboard() {
  const blogs = useSelector((state) => getAllBlogs(state)) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(
        `https://blog-backend-2-qz6x.onrender.com/api/blog/delete/${blogId}`
      );
      if (response.status === 200) {
        dispatch(getBlog());
      } 
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const openBlog = (id) => {
    navigate(`/blogs/${id}`);
  };

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  if (!Array.isArray(blogs)) {
    return <p>Invalid data format: blogs must be an array</p>;
  }

  return (
    <div className="grid h-screen p-4">
      <div className="p-4 border mb-10">
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={blog._id || index} className="border p-5 my-2">
              <div className="flex justify-between">
                <h2
                  onClick={() => openBlog(blog._id)}
                  className="text-md font-medium pb-2 cursor-pointer"
                >
                  {blog.title}
                </h2>
                <h2 className="text-sm font-medium pb-2">{blog.name}</h2>
              </div>
              <div className="flex justify-between">
                <div onClick={() => openBlog(blog._id)}>
                  <h1 className="text-sm">
                    Publish: {new Date(blog.createdAt).toLocaleDateString()}
                  </h1>
                  {Array.isArray(blog.tags) &&
                    blog.tags.map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className="px-2 py-1 border rounded-lg text-[10px] font-semibold mx-1"
                      >
                        {item}
                      </span>
                    ))}
                </div>

                <div>
                  <EditIcon
                    style={{ width: "14px", height: "14px" }}
                    className="mx-2 cursor-pointer"
                    onClick={() => handleEdit(blog._id)}
                  />
                  <MessageIcon style={{ width: "14px", height: "14px" }} className="mx-2" />
                  <ThumbUpIcon style={{ width: "14px", height: "14px" }} className="mx-2" />
                  <DeleteForeverIcon
                    style={{ width: "14px", height: "14px" }}
                    className="mx-2 cursor-pointer"
                    onClick={() => handleDelete(blog._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );


}

export default Dashboard;
