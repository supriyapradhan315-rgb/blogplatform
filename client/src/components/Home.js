import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_URL } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch posts';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {loading && <div className="text-center mt-10">Loading...</div>}
      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">{error}</p>
          <button
            type="button"
            onClick={fetchPosts}
            className="mt-3 inline-flex items-center rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center text-gray-600">No posts available yet.</div>
      )}
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded">
            {post.image && (
              <img src={`${API_BASE_URL}${post.image}`} alt={post.title} className="w-full h-48 object-cover mb-4 rounded" />
            )}
            <h2 className="text-xl font-semibold">
              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600">By {post.author?.username || 'Unknown'}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;