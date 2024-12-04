import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBlog, getSingleBlogs } from '../../store/addBlogSlice';
import EditIcon from '@mui/icons-material/Edit';

function SingleBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select blog data from the Redux store
  const block = useSelector(getSingleBlogs);

  // Fetch blog data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [dispatch, id]);

  // Handle loading and empty state
  if (!block) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-white w-full">
        <div className="m-5 bg-slate-50 shadow-xl p-5">
          <div className=' flex justify-between'>
            <div>
              <h1 className="text-xl font-bold mb-4">{block.title}</h1>
            </div>
            <div>
              {/* Edit Button */}
              {/* <EditIcon /> */}
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            Published on: {new Date(block.createdAt).toLocaleDateString()}
          </p>
          <img
            src={block.img || 'https://via.placeholder.com/600'}
            alt={block.title}
            className="w-full h-auto mb-4 rounded"
          />
          <div
            className="content mb-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          ></div>
          <div className="tags flex flex-wrap">
            {block.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border rounded-lg text-sm font-semibold mr-2 mb-2 bg-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link to="/dashboard" className=' text-blue-300 text-center items-center flex justify-center'>Move to Dashboard</Link>
    </div>
  );
}

export default SingleBlog;
