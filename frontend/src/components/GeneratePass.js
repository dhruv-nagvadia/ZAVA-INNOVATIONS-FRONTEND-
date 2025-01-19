import React from 'react';
import { useLocation } from 'react-router-dom';

const GeneratePass = () => {
  const location = useLocation();
  const { eventImage, uploadedImage, participantName } = location.state || {}; // Get the name from the state

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generate Your Event Pass</h1>

      {eventImage && (
        <div style={styles.overlayContainer}>
          {/* Base Event Image */}
          <img
            src={`http://localhost:5000/${eventImage}`}
            alt="Event"
            style={styles.eventImage}
          />

          {/* Black Circle */}
          <div style={styles.blackCircle}>
            {/* Uploaded Image inside the Black Circle */}
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={styles.uploadedImage}
              />
            )}
          </div>

          {/* Display the participant's name on the image */}
          {participantName && <div style={styles.participantName}>{participantName}</div>}
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  overlayContainer: {
    position: 'relative',
    width: '500px',
    height: 'auto',
  },
  eventImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  blackCircle: {
    position: 'absolute',
    top: '62.4%',
    left: '28.9%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    backgroundColor: 'black',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  participantName: {
    position: 'absolute', // Positioning name on the image
    top: '75%', // Adjust this value to position the name where you want
    left: '28.9%',
    transform: 'translateX(-50%)', // Center the name horizontally
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: 'black',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.11)', // Optional: adds a shadow to make the text stand out
  },
};

export default GeneratePass;  
