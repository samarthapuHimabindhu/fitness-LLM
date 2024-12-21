import React, { useRef, useState, useEffect, useCallback } from 'react';
import PoseDetector from './PoseDetector';

const VideoPlayer = ({ videoSrc, goBackToSelection, updateProgress }) => {
  const videoRef = useRef(null);
  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false); 

  const handleTimeUpdate = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      if (duration > 0) {
        updateProgress(videoSrc, currentTime, duration);
      }
    }
  }, [videoSrc, updateProgress]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('play', () => {
        setTimeout(() => {
          handleTimeUpdate();
        }, 1000);
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('play', handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate]);

  const handlePoseDetected = (landmarks) => {
    if (!landmarks || !landmarks[15] || !landmarks[16]) {
      setFeedback('Waiting for pose detection...');
      return;
    }

    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];

    if (Math.abs(leftWrist.y - rightWrist.y) < 0.05) {
      // Correct posture detected, play the video if not already playing
      if (!isPlaying) {
        setFeedback('Good posture! Keep going!');
        setIsPlaying(true); 
        videoRef.current?.play();
      }
    } else {
      if (isPlaying) {
        setFeedback('Incorrect posture detected! Pausing...');
        setIsPlaying(false); // Set video as paused
        videoRef.current?.pause();
      }
    }
  };

  if (!videoSrc) {
    return <p>Error: No video source provided.</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0',
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <h3 style={{ margin: '10px 0' }}>Exercise: {videoSrc}</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
          height: 'calc(100% - 60px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Video Section */}
        <div
          style={{
            width: '48%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              border: '1px solid #ccc',
              borderRadius: '10px',
            }}
            controls
            src={`/videos/${videoSrc}`}
          />
          <p
            style={{
              color: feedback.includes('Good') ? 'green' : 'red',
              fontSize: '30px', 
              fontWeight: 'bold', 
              marginTop: '20px',
            }}
          >
            {feedback}
          </p>
        </div>

        {/* Pose Detector Section */}
        <div
          style={{
            width: '48%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
        >
          <PoseDetector onPoseDetected={handlePoseDetected} />
        </div>
      </div>

      {/* Back Button */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '10px 0',
        }}
      >
        <button
          onClick={goBackToSelection}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Video Selection
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
