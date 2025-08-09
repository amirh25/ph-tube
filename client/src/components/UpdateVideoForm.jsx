import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateVideoForm = () => {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setUrl(response.data.url);
        setTitle(response.data.title);  
      } catch (error) {
        toast.error('Failed to fetch video details');
      }
    };
    fetchVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}`, { url, title }); 
      toast.success('Video updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update video');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Update Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  state
          required
        />
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Video
        </button>
      </form>
    </div>
  );
};

export default UpdateVideoForm;
