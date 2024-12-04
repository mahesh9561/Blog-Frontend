import React, { useEffect, useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { sendBlog } from "../../store/addBlogSlice";
import useAuth from "../../Hooks/useAuth";
import "react-quill/dist/quill.snow.css";
const ReactQuill = React.lazy(() => import("react-quill"));


function WriteBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { username } = useAuth();

    const handleSubmit = async () => {
        try {
            await dispatch(sendBlog({ title, content, categories, tags, name: username })).unwrap();
            setError("");
            alert("Blog published successfully!");
        } catch (err) {
            const errorMessage = err?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
        }
        setTitle("");
        setContent("");
        setCategories([]);
        setTags([]);
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
                            <p>A blog with this title already exists</p>
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
                            value={tags}
                            onChange={(e) => setTags(e.target.value.split(","))}
                        />
                    </div>
                    <div>
                        Categories:
                        <input
                            type="text"
                            placeholder="Please enter categories"
                            className="w-full border-b outline-none rounded-lg px-4 py-4"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value.split(","))}
                        />
                    </div>
                </div>

                <div className="flex justify-between pb-5">
                    <button className="border px-4 py-1 rounded-full bg-gray-100 mx-1">Preview</button>
                    <button
                        className="border px-4 py-1 rounded-full bg-gray-300 mx-1"
                        onClick={handleSubmit}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WriteBlog;
