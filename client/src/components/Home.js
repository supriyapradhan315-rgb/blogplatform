import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_URL } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts`);
        setPosts(res.data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
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