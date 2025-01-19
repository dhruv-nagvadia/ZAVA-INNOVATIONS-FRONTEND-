import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GeneratePass = () => {
  const location = useLocation();
  const { eventImage, uploadedImage, participantName, regions } = location.state || {};

  // State to manage regions loading status
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);

  useEffect(() => {
    if (regions && regions.length > 0) {
      setIsLoadingRegions(false);  // If regions exist, stop loading
    } else {
      setIsLoadingRegions(true);  // Keep loading if regions are not passed
    }
  }, [regions]);

  // Show loading message if regions are not loaded
  if (isLoadingRegions) {
    return <p>Loading event regions...</p>;
  }

  // Default message when there is no uploaded image or event image
  const defaultImageMessage = "No image available";

  return (
    <div className="generate-pass-container" style={{ position: 'relative' }}>
      <h1>Event Participation Pass</h1>

      <div className="event-image-container" style={{ position: 'relative' }}>
        {eventImage ? (
          <img
            src={`http://localhost:5000/${eventImage}`}
            alt="Event"
            style={{
              width: '100%',
              height: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          />
        ) : (
          <p>{defaultImageMessage}</p>
        )}

        {regions && regions.length > 0 ? (
          regions.map((region, index) => {
            if (!region.coordinates) {
              console.warn(`Region ${index} is missing coordinates.`);
              return null;
            }

            const { x, y, width, height } = region.coordinates;
            const isCircle = region.type === 'circle';

            return (
              <div
                key={index}
                className="region"
                style={{
                  position: 'absolute',
                  top: y,
                  left: x,
                  width: width,
                  height: height,
                  border: isCircle ? '2px solid #000' : 'none',
                  borderRadius: isCircle ? '50%' : '0%',
                  overflow: 'hidden',
                  zIndex: 2,
                }}
              >
                {/* Handle uploaded participant photo */}
                {index === 0 ? (
                  uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded Participant"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <p>{defaultImageMessage}</p>
                  )
                ) : index === 1 ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}
                  >
                    <p>{participantName || "No participant name"}</p>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <p>No regions available for this event.</p>
        )}
      </div>
    </div> 
  );
};

export default GeneratePass;
