
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar';
// import VideoPlayer from './components/VideoPlayer';
// import LoginPage from './components/LoginPage';
// import SignUpPage from './components/signup';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [videoProgress, setVideoProgress] = useState([]); // Track progress for each video

//   const videoList = [
//     { id: 1, src: 'video1.mp4', title: 'video1' },
//     { id: 2, src: 'video2.mp4', title: 'video2' },
//     { id: 3, src: 'video3.mp4', title: 'video3' },
//     { id: 4, src: 'video4.mp4', title: 'video4' },
//     { id: 5, src: 'video5.mp4', title: 'video5' },
//     { id: 6, src: 'video6.mp4', title: 'video6' },
//     { id: 7, src: 'video7.mp4', title: 'video7' },
//     { id: 8, src: 'video8.mp4', title: 'video8' },
//     { id: 9, src: 'video9.mp4', title: 'video9' },
//     { id: 10, src: 'video10.mp4', title: 'video10' },
//   ];

//   // Load progress from localStorage on initial render
//   useEffect(() => {
//     const savedProgress = JSON.parse(localStorage.getItem('videoProgress')) || [];
//     setVideoProgress(savedProgress);
//   }, []);

//   // Save progress to localStorage whenever progress state changes
//   useEffect(() => {
//     localStorage.setItem('videoProgress', JSON.stringify(videoProgress));
//   }, [videoProgress]);

//   // Update the progress of a video
//   const updateProgress = (videoId, currentTime, duration) => {
//     const progress = (currentTime / duration) * 100; // Calculate progress as percentage
//     setVideoProgress((prevProgress) => {
//       const updatedProgress = prevProgress.map((video) =>
//         video.id === videoId ? { ...video, progress } : video
//       );
//       return updatedProgress;
//     });
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleVideoSelect = (video) => {
//     setSelectedVideo(video.src || null);
//   };

//   const goBackToSelection = () => {
//     setSelectedVideo(null);
//   };

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to={isLoggedIn ? '/videos' : '/login'} />} />
//         <Route
//           path="/login"
//           element={isLoggedIn ? <Navigate to="/videos" /> : <LoginPage onLogin={handleLogin} />}
//         />
//         <Route
//           path="/signup"
//           element={isLoggedIn ? <Navigate to="/videos" /> : <SignUpPage onSignUp={handleLogin} />}
//         />
//         <Route
//           path="/videos"
//           element={
//             !isLoggedIn ? (
//               <Navigate to="/login" />
//             ) : selectedVideo ? (
//               <VideoPlayer
//                 videoSrc={selectedVideo}
//                 goBackToSelection={goBackToSelection}
//                 updateProgress={updateProgress} // Pass the updateProgress function to VideoPlayer
//               />
//             ) : (
//               <div style={{ padding: '20px' }}>
//                 <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Select an Exercise Video</h2>
//                 <div
//                   style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                     gap: '20px',
//                     width: '150%',
//                     maxWidth: '1200px',
//                     margin: '0 auto',
//                     padding: '10px',
//                     boxSizing: 'border-box',
//                   }}
//                 >
//                   {videoList.map((video) => {
//                     const progress = videoProgress.find((v) => v.id === video.id)?.progress || 0;
//                     return (
//                       <div
//                         key={video.id}
//                         onClick={() => handleVideoSelect(video)}
//                         style={{
//                           border: '1px solid #ccc',
//                           borderRadius: '5px',
//                           padding: '10px',
//                           textAlign: 'center',
//                           cursor: 'pointer',
//                           backgroundColor: '#f9f9f9',
//                           boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                           transition: 'transform 0.2s',
//                         }}
//                       >
//                         <h4 style={{ fontSize: '14px', margin: '10px 0' }}>{video.title}</h4>
//                         <button
//                           style={{
//                             padding: '5px 10px',
//                             backgroundColor: '#007BFF',
//                             color: '#fff',
//                             border: 'none',
//                             borderRadius: '5px',
//                             fontSize: '12px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           {progress === 100 ? 'Completed' : `${Math.round(progress)}% Completed`}
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState([]); // Track progress for each video

  const videoList = [
    { id: 1, src: 'video1.mp4', title: 'video1' },
    { id: 2, src: 'video2.mp4', title: 'video2' },
    { id: 3, src: 'video3.mp4', title: 'video3' },
    { id: 4, src: 'video4.mp4', title: 'video4' },
    { id: 5, src: 'video5.mp4', title: 'video5' },
    { id: 6, src: 'video6.mp4', title: 'video6' },
    { id: 7, src: 'video7.mp4', title: 'video7' },
    { id: 8, src: 'video8.mp4', title: 'video8' },
    { id: 9, src: 'video9.mp4', title: 'video9' },
    { id: 10, src: 'video10.mp4', title: 'video10' },
  ];

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('videoProgress')) || [];
    setVideoProgress(savedProgress);
  }, []);

  // Save progress to localStorage whenever progress state changes
  useEffect(() => {
    localStorage.setItem('videoProgress', JSON.stringify(videoProgress));
  }, [videoProgress]);

  // Update the progress of a video
  const updateProgress = (videoId, currentTime, duration) => {
    const progress = (currentTime / duration) * 100; // Calculate progress as percentage
    setVideoProgress((prevProgress) => {
      const updatedProgress = prevProgress.map((video) =>
        video.id === videoId ? { ...video, progress } : video
      );
      return updatedProgress;
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video.src || null);
  };

  const goBackToSelection = () => {
    setSelectedVideo(null);
  };

  return (
    <Router>
      {/* Background Video */}
      <video className="background-video" autoPlay muted loop>
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/videos' : '/login'} />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/videos" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/videos" /> : <SignUpPage onSignUp={handleLogin} />}
        />
        <Route
          path="/videos"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : selectedVideo ? (
              <VideoPlayer
                videoSrc={selectedVideo}
                goBackToSelection={goBackToSelection}
                updateProgress={updateProgress} // Pass the updateProgress function to VideoPlayer
              />
            ) : (
              <div style={{ padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '15px',color: 'white' }}>Select an Exercise Video</h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    width: '150%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '10px',
                    boxSizing: 'border-box',
                  }}
                >
                  {videoList.map((video) => {
                    const progress = videoProgress.find((v) => v.id === video.id)?.progress || 0;
                    return (
                      <div
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          padding: '10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: '#f9f9f9',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                          transition: 'transform 0.2s',
                        }}
                      >
                        <h4 style={{ fontSize: '14px', margin: '10px 0' }}>{video.title}</h4>
                        <button
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          {progress === 100 ? 'Completed' : `${Math.round(progress)}% Completed`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
