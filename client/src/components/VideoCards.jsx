import React from 'react';
import Swal from 'sweetalert2';

const VideoCards = ({ video }) => {





  return (
    <div className="card w-58 bg-base-100 shadow-xl">
      <figure>
        <iframe
          src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          title="YouTube video"
          className="w-full h-56"
        ></iframe>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{video.title}</h2>
        <h3 className='text-[13px] font-bold text-gray-400'>Demo Account</h3>
        <h2>3.2k views . 1 min ago</h2>

      </div>
    </div>
  );
};

export default VideoCards;
