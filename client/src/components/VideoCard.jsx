import React from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the video",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(video.id);
        toast.success("Video deleted successfully");
      }
    });
  };

  const handleUpdate = () => {
    navigate(`/update/${video.id}`);  // Navigate to update form with video ID
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <iframe
          src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          title="YouTube video"
          className="w-full h-56"
        ></iframe>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{video.title}</h2>
        <div className="card-actions justify-end">
          <button
            onClick={handleUpdate}
            className="btn btn-primary btn-sm"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
