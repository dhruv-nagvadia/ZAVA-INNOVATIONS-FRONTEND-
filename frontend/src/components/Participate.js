
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Participate = () => {
//   const [eventData, setEventData] = useState({
//     fullName: '',
//     contactNo: '',
//     photo: null,
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [updatedRegions, setUpdatedRegions] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { event } = location.state || {}; // Extract event and regions
//   const eventId = event ? event._id : '';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setEventData((prevData) => ({
//       ...prevData,
//       photo: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     const formData = new FormData();
//     formData.append('fullName', eventData.fullName);
//     formData.append('contactNo', eventData.contactNo);
//     formData.append('photo', eventData.photo);
//     formData.append('eventId', eventId); // Add eventId to the form data

//     try {
//       const response = await axios.post('http://localhost:5000/api/participate', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         setSuccessMessage('Participant added successfully!');
//         setUpdatedRegions(response.data.updatedEvent.regions); // Update regions dynamically
//         setParticipants([...participants, response.data.participant]); // Add participant to the list
//       } else {
//         setErrorMessage(response.data.message || 'Failed to add participant. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="add-event-container">
//       <h1>Participate</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="photo">Add Photo:</label>
//           <input
//             type="file"
//             id="photo"
//             name="photo"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="fullName">Full Name:</label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={eventData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="contactNo">Contact No:</label>
//           <input
//             type="text"
//             id="contactNo"
//             name="contactNo"
//             value={eventData.contactNo}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Participate</button>
//       </form>

//       {event && updatedRegions && (
//         <div
//           className="image-container"
//           style={{
//             position: 'relative',
//             marginTop: '20px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <img
//             src={`http://localhost:5000/${event.photo}`}
//             alt={event.title}
//             style={{
//               width: '100%',
//               height: 'auto',
//               maxWidth: '600px', // Fixed image size, will not resize
//               objectFit: 'contain', // Maintain aspect ratio
//               display: 'block',
//               position: 'relative',
//             }}
//           />
//           {updatedRegions.map((region, index) => (
//             <div
//               key={index}
//               style={{
//                 position: 'absolute',
//                 top: `${region.y}px`,
//                 left: `${region.x}px`,
//                 width: `${region.width}px`,
//                 height: `${region.height}px`,
//                 // border: `2px solid ${region.color}`,
//                 borderRadius: region.shape === 'circle' ? '50%' : '0',
//                 overflow: 'hidden', // Hide overflowing content
//               }}
//             >
//               {region.type === 'photo' ? (
//                 // Show photo if region type is "photo"
//                 participants.map((participant, participantIndex) => (
//                   <img
//                     key={participantIndex}
//                     src={`http://localhost:5000/uploads/participants/${participant.photo.split('/').pop()}`}
//                     alt={participant.fullName}
//                     style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover', // Ensure the image fits the region without distortion
//                     }}
//                   />
//                 ))
//               ) : region.type === 'text' ? (
//                 // Show full name if region type is "text"
//                 participants.map((participant, participantIndex) => {
//                   // Calculate the font size as a fraction of the region's width or height
//                   const fontSize = Math.min(region.width, region.height) / 4; // You can adjust the denominator to control font size
              
//                   return (
//                     <div
//                       key={participantIndex}
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         color: 'black', // Set the text color to black
//                         fontSize: `${fontSize}px`, // Set dynamic font size based on region size
//                         textAlign: 'center',
//                       }}
//                     >
//                       {participant.fullName}
//                     </div>
//                   );
//                 })
//               ) : null}
              
              
//             </div>
//           ))}
//         </div>
//       )}

//       <div>
//         <h2>Participants</h2>
//         {participants.length > 0 ? (
//           participants.map((participant, index) => (
//             <div key={index}>
//               <p>{participant.fullName}</p>
//             </div>
//           ))
//         ) : (
//           <p>No participants yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Participate;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cropper from 'react-cropper'; // Import Cropper
import 'cropperjs/dist/cropper.css'; // Import Cropper CSS

const Participate = () => {
  const [eventData, setEventData] = useState({
    fullName: '',
    contactNo: '',
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [updatedRegions, setUpdatedRegions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null); // State for cropped image
  const [croppedImageId, setCroppedImageId] = useState(null); // Track which region is cropped
  const [imgpath,setpath] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { event } = location.state || {}; // Extract event and regions
  const eventId = event ? event._id : '';

  const cropperRef = useRef(null); // Reference for cropper instance

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleImageCrop = () => {
    const cropper = cropperRef.current.cropper; // Get cropper instance
    setCroppedImage(cropper.getCroppedCanvas().toDataURL()); // Get cropped image as data URL
  };

  const handleRegionSelect = (regionId) => {
    setCroppedImageId(regionId); // Set the region where the image should be placed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    const formData = new FormData();
    formData.append('fullName', eventData.fullName);
    formData.append('contactNo', eventData.contactNo);
    if (croppedImage) {
      // Convert the cropped image (base64) to Blob
      const blob = base64ToBlob(croppedImage, 'image/jpeg');
      formData.append('photo', blob, 'cropped-image.jpg');
    } else {
      formData.append('photo', eventData.photo);
    }
    formData.append('eventId', eventId); // Add eventId to the form data
  
    try {
      const response = await axios.post('http://localhost:5000/api/participate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        setSuccessMessage('Participant added successfully!');
        setUpdatedRegions(response.data.updatedEvent.regions); // Update regions dynamically
        setParticipants([...participants, response.data.participant]); // Add participant to the list
  
        // Now update imgpath after response is successful
        const participantPhotoPath = response.data.participant.photo;
        console.log(participantPhotoPath);
        
        setpath("http://localhost:5000" + participantPhotoPath); // Update imgpath state with the photo URL
        console.log("Updated image path:", participantPhotoPath); // Check the value of the path
        console.log(imgpath);
        
  
      } else {
        setErrorMessage(response.data.message || 'Failed to add participant. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error occurred. Please try again.');
    }
  };
  
  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  };

  useEffect(() => {
    if (croppedImage && croppedImageId) {
      setUpdatedRegions((prevRegions) =>
        prevRegions.map((region) =>
          region.id === croppedImageId
            ? { ...region, image: croppedImage } // Assign cropped image to the region
            : region
        )
      );
    }
  }, [croppedImage, croppedImageId]);

  return (
    <div className="add-event-container">
      <h1>Participate</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Add Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {eventData.photo && (
          <div className="cropper-container" style={{ marginTop: '20px' }}>
            <Cropper
              src={URL.createObjectURL(eventData.photo)} // Display the selected photo
              style={{ width: '100%', height: '400px' }}
              initialAspectRatio={1}
              guides={false}
              ref={cropperRef} // Reference for cropper
            />
            <button type="button" onClick={handleImageCrop}>
              Crop Image
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={eventData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={eventData.contactNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Participate</button>
      </form>

      {event && updatedRegions && (
        <div
          className="image-container"
          style={{
            position: 'relative',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={`http://localhost:5000/${event.photo}`}
            alt={event.title}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '600px',
              objectFit: 'contain',
              display: 'block',
              position: 'relative',
            }}
          />
          {updatedRegions.map((region, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: `${region.y}px`,
                left: `${region.x}px`,
                width: `${region.width}px`,
                height: `${region.height}px`,
                borderRadius: region.shape === 'circle' ? '50%' : '0',
                overflow: 'hidden',
              }}
              onClick={() => handleRegionSelect(region.id)} // Select region on click
            >
              {region.type === 'photo'  ? (
                <img
                src={`${imgpath}`}
 // Show cropped image in region
                  alt="Cropped"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : region.type === 'text' ? (
                participants.map((participant, participantIndex) => {
                  const fontSize = Math.min(region.width, region.height) / 4;
                  return (
                    <div
                      key={participantIndex}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                        fontSize: `${fontSize}px`,
                        textAlign: 'center',
                      }}
                    >
                      {participant.fullName}
                    </div>
                  );
                })
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div>
        <h2>Participants</h2>
        {participants.length > 0 ? (
          participants.map((participant, index) => (
            <div key={index}>
              <p>{participant.fullName}</p>
            </div>
          ))
        ) : (
          <p>No participants yet.</p>
        )}
      </div>
    </div>
  );
};

export default Participate;
