import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog, getSingleBlogs } from "../../store/addBlogSlice";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ReactQuill = React.lazy(() => import("react-quill"));

function UpdateBlogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const blogs = useSelector(getSingleBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the blog data when the component mounts
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  // Set the state fields when the blog data is loaded
  useEffect(() => {
    if (blogs) {
      setTitle(blogs.title || "");
      setContent(blogs.content || "");
      setCategories(blogs.categories || []);
      setTags(blogs.tags || []);
    }
  }, [blogs]);

  const handleEdit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setLoading(true);
    setError(""); // Clear previous error
    try {
      const response = await axios.put(`https://blog-backend-2-qz6x.onrender.com/api/blog/update/${id}`, {
        title,
        content,
        categories,
        tags,
      });
      console.log("Blog updated:", response.data);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError("Failed to update the blog. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-400">
      <div className="px-2 bg-white shadow-xl">
        <div className="flex justify-between items-center py-4">
          <input
            className="w-full border-b outline-none rounded-lg px-4 py-2"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center py-4">
          <Suspense fallback={<div>Loading editor...</div>}>
            <ReactQuill
              className="w-full h-[60vh] pb-10"
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
            />
          </Suspense>
        </div>

        <div className="py-2">
          {error && (
            <div className="text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="py-2 flex w-full">
          <div>
            Tags:
            <input
              type="text"
              placeholder="Please enter tags"
              className="w-full border-b outline-none rounded-lg px-4 py-4"
              value={tags.join(",")}
              onChange={(e) => setTags(e.target.value.split(","))}
            />
          </div>
          <div>
            Categories:
            <input
              type="text"
              placeholder="Please enter categories"
              className="w-full border-b outline-none rounded-lg px-4 py-4"
              value={categories.join(",")}
              onChange={(e) => setCategories(e.target.value.split(","))}
            />
          </div>
        </div>

        <div className="flex justify-between pb-5">
          <button className="border px-4 py-1 rounded-full bg-gray-100 mx-1">Preview</button>
          <button
            className="border px-4 py-1 rounded-full bg-gray-300 mx-1"
            onClick={handleEdit}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlogs;
