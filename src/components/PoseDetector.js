import React, { useEffect, useRef, useState } from 'react';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

const PoseDetector = ({ onPoseDetected, onBackToSelection }) => {
  const videoRef = useRef(null);
  const [poseInstance, setPoseInstance] = useState(null);
  const [cameraInstance, setCameraInstance] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Initializing webcam...');

  useEffect(() => {
    let pose, camera;

    const initializePose = () => {
      pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults((results) => {
        if (onPoseDetected) {
          onPoseDetected(results.poseLandmarks);
        }
      });

      setPoseInstance(pose);
    };

    const initializeCamera = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        camera = new Camera(videoElement, {
          onFrame: async () => {
            if (pose) {
              try {
                await pose.send({ image: videoElement });
              } catch (err) {
                console.error('Pose detection error:', err);
              }
            }
          },
          width: 640,
          height: 480,
        });

        camera.start()
          .then(() => setStatusMessage('Webcam active. Pose detection running.'))
          .catch((err) => {
            console.error('Camera initialization error:', err);
            setStatusMessage('Failed to access webcam.');
          });

        setCameraInstance(camera);
      }
    };

    initializePose();
    initializeCamera();

    return () => {
      // Cleanup camera and pose instances
      if (camera) {
        camera.stop();
      }
      if (pose) {
        pose.close();
      }

      setCameraInstance(null);
      setPoseInstance(null);
    };
  }, [onPoseDetected]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <video
        ref={videoRef}
        className="input_video"
        width="640"
        height="480"
        autoPlay
        playsInline
        style={{
          border: '2px solid #ccc',
          borderRadius: '10px',
          transform: 'scaleX(-1)', // Mirror the video feed to act as a "mirror"
        }}
      />
      <p style={{ marginTop: '10px', fontSize: '16px', color: 'gray' }}>
        {statusMessage}
      </p>
      {/* <button 
      onClick={onBackToSelection}
      style={{
        position: 'absolute',
        bottom:'20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        fontSize: '20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    > Back to video selection
    </button> */}
    </div>
  );
};

export default PoseDetector;
