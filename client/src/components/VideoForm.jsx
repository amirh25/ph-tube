import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoForm = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/videos', { url, title });
      toast.success('Video added successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add video');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Add a New Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          placeholder="Enter Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          placeholder="Enter YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Video
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
