import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://blogplatform-2r1b.onrender.com/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`${API_URL}/posts/${id}`);
        setPost(postRes.data);
      } catch (err) {
        setError('Failed to fetch post');
      }

      try {
        const commentsRes = await axios.get(`${API_URL}/comments/${id}`);
        setComments(commentsRes.data);
      } catch (err) {
        setCommentError('Failed to fetch comments');
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to comment');
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/comments/${id}`, { text: newComment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">By {post.author.username}</p>
      <p className="text-sm text-gray-500 mb-6">{new Date(post.createdAt).toLocaleDateString()}</p>
      {post.image && (
        <img src={`${API_URL}${post.image}`} alt={post.title} className="w-full max-w-2xl h-auto mb-6 rounded" />
      )}
      <div className="mb-8">{post.content}</div>

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {commentError && <div className="text-red-500 mb-4">{commentError}</div>}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment._id} className="border p-4 rounded">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">By {comment.user.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
            {localStorage.getItem('token') && (
              <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 mt-2">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;