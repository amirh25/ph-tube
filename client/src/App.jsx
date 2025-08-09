import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import VideoList from './components/VideoList';
import VideoForm from './components/VideoForm';
import UpdateVideoForm from './components/UpdateVideoForm';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    toast.info('Profile menu clicked!'); // Toast notification on menu toggle
  };

  useEffect(() => {
    toast.success('Welcome to PhTube!'); // Welcome toast on page load
  }, []);

  return (
    <Router>
      <div>
        {/* Navbar with Logo, Menu, and Profile Icon */}
        <div className="navbar bg-blue-600 text-white p-4">
          <div className="navbar-start">
            {/* PhTube Logo on Left */}
            <Link to="/" className="text-2xl font-semibold">
              PhTube
            </Link>
          </div>

          {/* Normal Menu in the Center */}
          <div className="navbar-center">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Upload</Link>
              </li>
            </ul>
          </div>

          {/* Profile Icon on the Right */}
          <div className="navbar-end">
            <div className="dropdown">
              <button onClick={toggleMenu}>
                {/* Profile Icon */}
                <div className="rounded-full w-10 h-10 bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.418 0-8 2.686-8 6s3.582 6 8 6 8-2.686 8-6-3.582-6-8-6zm0-4c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/add" element={<VideoForm />} />
          <Route path="/update/:id" element={<UpdateVideoForm />} />
        </Routes>

        {/* Toast Notifications Container */}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
