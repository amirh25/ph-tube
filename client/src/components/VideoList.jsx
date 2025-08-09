import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { toast } from 'react-toastify';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/videos');
        setVideos(data);
      } catch (error) {
        toast.error('Failed to fetch videos');
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((video) => video.id !== id));
      toast.success('Video deleted successfully');
    } catch (error) {
      toast.error('Failed to delete video');
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the Update page
    console.log('Update video with ID:', id);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search videos"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
