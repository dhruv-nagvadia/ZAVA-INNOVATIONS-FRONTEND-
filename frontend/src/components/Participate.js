
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import html2pdf from 'html2pdf.js';


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
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [croppedImageId, setCroppedImageId] = useState(null);
//   const [imgpath, setpath] = useState(null);
//   const [isCropperVisible, setIsCropperVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [imageSize, setImageSize] = useState({ width: 500, height: 500 });
//   const imageRef = useRef(null);;
//   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
//   const imageContainerRef = useRef(null); // Reference for the region to be captured
//   const pdfContainerRef = useRef(null); // Reference for the PDF download button
//   const { event } = location.state || {};
//   const eventId = event ? event._id : '';
//   const cropperRef = useRef(null);
//   const container = imageContainerRef.current;
//   if (container) {
//     const containerWidth = container.clientWidth;
//     const containerHeight = container.clientHeight;
//     // Proceed with the logic
//   }

  
  

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
//     setIsCropperVisible(true);
//   };

//   const handleImageCrop = () => {
//     const cropper = cropperRef.current.cropper;
//     setCroppedImage(cropper.getCroppedCanvas().toDataURL());
//     setIsCropperVisible(false);
//     setSuccessMessage('Image cropped successfully!');
//   };

//   const handleRegionSelect = (regionId) => {  
//     setCroppedImageId(regionId);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     const formData = new FormData();
//     formData.append('fullName', eventData.fullName);
//     formData.append('contactNo', eventData.contactNo);
//     if (croppedImage) {
//       const blob = base64ToBlob(croppedImage, 'image/jpeg');
//       formData.append('photo', blob, 'cropped-image.jpg');
//     } else {
//       formData.append('photo', eventData.photo);
//     }
//     formData.append('eventId', eventId);

//     try {
//       const response = await axios.post('http://localhost:5000/api/participate', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         setSuccessMessage('Participant added successfully!');
//         setUpdatedRegions(response.data.updatedEvent.regions);
//         setParticipants([...participants, response.data.participant]);
//         const participantPhotoPath = response.data.participant.photo;
//         setpath("http://localhost:5000" + participantPhotoPath);
//       } else {
//         setErrorMessage(response.data.message || 'Failed to add participant. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Error occurred. Please try again.');
//     }
//   };

//   const base64ToBlob = (base64Data, contentType) => {
//     const byteCharacters = atob(base64Data.split(',')[1]);
//     const byteArrays = [];
//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }
//     return new Blob(byteArrays, { type: contentType });
//   };

//   const handleDownloadPDF = () => {
//     const element = imageContainerRef.current;
  
//     // Force the element to have a width of 500px for PDF download
//     const originalWidth = element.offsetWidth;
//     element.style.width = '500px'; // Set the width to the max width (500px)
  
//     // Ensure the image is resized according to the new width (500px)
//     const img = element.querySelector('img');
//     if (img) {
//       img.style.width = '100%'; // Ensure the image resizes correctly
//       img.style.height = 'auto'; // Keep the aspect ratio intact
//     }
  
//     // Now capture the content as a PDF
//     html2pdf()
//       .from(element)
//       .set({
//         margin: 0,
//         filename: 'image-region.pdf',
//         html2canvas: {
//           scale: 2,  // Adjust scale for better resolution
//           logging: true,
//           useCORS: true,
//           allowTaint: true,
//           width: 500,  // Force the width to 500px
//           height: element.offsetHeight, // Capture the element height based on the content
//           x: 0,
//           y: 0,
//         },
//         jsPDF: {
//           unit: 'mm',
//           format: 'a4',
//           orientation: 'portrait',
//           compress: true,
//         }
//       })
//       .save();
  
//     // After the download, revert the element's width back to its original size
//     element.style.width = `${originalWidth}px`;
//   };
  
  
// useEffect(() => {
// const updateContainerSize = () => {
//   if (imageContainerRef.current) {
//     setContainerSize({
//       width: imageContainerRef.current.offsetWidth,
//       height: imageContainerRef.current.offsetHeight,
//     });
//   }
// };

// updateContainerSize(); // Initial size check
// window.addEventListener("resize", updateContainerSize); // Update on window resize

// return () => {
//   window.removeEventListener("resize", updateContainerSize);
// };
// }, []); // Empty dependency array ensures this runs once after the initial render



// // Recalculate regions based on new image size
// useEffect(() => {
// if (imageSize.width && imageSize.height && updatedRegions.length > 0) {
//   const updatedRegionSizes = updatedRegions.map((region) => {
//     return {
//       ...region,
//       x: (region.x / 500) * imageSize.width,
//       y: (region.y / 500) * imageSize.height,
//       width: (region.width / 500) * imageSize.width,
//       height: (region.height / 500) * imageSize.height,
//     };
//   });

//   // Only update state if the region sizes have actually changed
//   const hasChanges = !updatedRegionSizes.every(
//     (region, index) =>
//       region.x === updatedRegions[index]?.x &&
//       region.y === updatedRegions[index]?.y &&
//       region.width === updatedRegions[index]?.width &&
//       region.height === updatedRegions[index]?.height
//   );

//   if (hasChanges) {
//     setUpdatedRegions(updatedRegionSizes); // Update regions based on new image size
//   }
// }
// }, [imageSize, updatedRegions]); // Ensure this is only triggered by changes in imageSize or updatedRegions

// return (
// <div className="add-event-container">
//   <h1>Participate</h1>
//   {errorMessage && <p className="error-message">{errorMessage}</p>}
//   {successMessage && <p className="success-message">{successMessage}</p>}

//   <form onSubmit={handleSubmit}>
//     <div className="form-group">
//       <label htmlFor="photo">Add Photo:</label>
//       <input
//         type="file"
//         id="photo"
//         name="photo"
//         accept="image/*"
//         onChange={handleFileChange}
//         required
//       />
//     </div>

//     {eventData.photo && isCropperVisible && (
//       <div className="cropper-container">
//         <Cropper
//           src={URL.createObjectURL(eventData.photo)}
//           style={{ width: "100%", height: "400px" }}
//           initialAspectRatio={1}
//           guides={false}
//           ref={cropperRef}
//         />
//         <button type="button" onClick={handleImageCrop}>
//           Crop Image
//         </button>
//       </div>
//     )}

//     <div className="form-group">
//       <label htmlFor="fullName">Full Name:</label>
//       <input
//         type="text"
//         id="fullName"
//         name="fullName"
//         value={eventData.fullName}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="contactNo">Contact No:</label>
//       <input
//         type="text"
//         id="contactNo"
//         name="contactNo"
//         value={eventData.contactNo}
//         onChange={handleChange}
//         required
//       />
//     </div>

//     <button type="submit">Participate</button>
//   </form>

//   {updatedRegions && (
//      <div
//      ref={imageContainerRef}
//      style={{
//        position: "relative",  // Make sure this is set to 'relative'
//        marginTop: "20px",
//        display: "flex",
//        alignItems: "center",
//        width: "100%",
//        maxWidth:"500px",
//        height: "auto",  // Adjust the height automatically based on content
//      }}
//    >
//      <img
//        src={`http://localhost:5000/${event.photo}`}
//        alt={event.title}
//        style={{
//          width: "100%",
//          height: "auto",
//          objectFit: "contain",
//          display: "block",
//        }}
//      />
//      {updatedRegions.map((region, index) => (
//        <div
//          key={index}
//          style={{
//            position: "absolute",
//            top: `${(region.y / 500) * containerSize.height}px`,
//            left: `${(region.x / 500) * containerSize.width}px`,
//            width: `${(region.width / 500) * containerSize.width}px`,
//            height: `${(region.height / 500) * containerSize.height}px`,
//            borderRadius: region.shape === "circle" ? "50%" : "0",
//            overflow: "hidden",
//          }}
//          onClick={() => handleRegionSelect(region.id)}
//        >
//          {region.type === "photo" ? (
//            <img
//              src={imgpath}
//              alt="Cropped"
//              style={{
//                position: "absolute",
//                top: 0,
//                left: 0,
//                width: "100%",
//                height: "100%",
//                objectFit: "cover",
//              }}
//            />
//          ) : region.type === "text" ? (
//            participants.map((participant, participantIndex) => {
//              const fontSize = Math.min(region.width, region.height) / 4;
//              return (
//                <div
//                  key={participantIndex}
//                  className="participant-text"
//                  style={{
//                    position: "absolute",
//                    top: 0,
//                    left: 0,
//                    width: "100%",
//                    height: "100%",
//                    display: "flex",
//                    justifyContent: "center",
//                    alignItems: "center",
//                    color: "white",
//                    fontSize: `${fontSize}px`,
//                    textAlign: "center",
//                  }}
//                >
//                  {participant.fullName}
//                </div>
//              );
//            })
//          ) : null}
//        </div>
//      ))}
//    </div>     
//   )}

//     <div ref={pdfContainerRef} className="pdf-content" style={{ marginTop: "20px" }}>
//       <button onClick={handleDownloadPDF}>Download PDF</button>
//     </div>
// </div>  
// );

// };

// export default Participate;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import html2pdf from 'html2pdf.js';


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
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageId, setCroppedImageId] = useState(null);
  const [imgpath, setpath] = useState(null);
  const [isCropperVisible, setIsCropperVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [imageSize, setImageSize] = useState({ width: 500, height: 500 });
  const imageRef = useRef(null);;
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const imageContainerRef = useRef(null); 
  const pdfContainerRef = useRef(null); 
  const { event } = location.state || {};
  const eventId = event ? event._id : '';
  const cropperRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const container = imageContainerRef.current;
  if (container) {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
  }

  
  

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
    setIsCropperVisible(true);
  };

  const handleImageCrop = () => {
    const cropper = cropperRef.current.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    setIsCropperVisible(false);
    setSuccessMessage('Image cropped successfully!');
  };

  const handleRegionSelect = (regionId) => {  
    setCroppedImageId(regionId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('fullName', eventData.fullName);
    formData.append('contactNo', eventData.contactNo);
    if (croppedImage) {
      const blob = base64ToBlob(croppedImage, 'image/jpeg');
      formData.append('photo', blob, 'cropped-image.jpg');
    } else {
      formData.append('photo', eventData.photo);
    }
    formData.append('eventId', eventId);

    try {
      const response = await axios.post('http://localhost:5000/api/participate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccessMessage('Participant added successfully!');
        setUpdatedRegions(response.data.updatedEvent.regions);
        setParticipants([...participants, response.data.participant]);
        const participantPhotoPath = response.data.participant.photo;
        setpath("http://localhost:5000" + participantPhotoPath);
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

  const handleDownloadPDF = () => {
    const element = imageContainerRef.current;
  
    
    const originalWidth = element.offsetWidth;
    element.style.width = '500px'; 
  
    const img = element.querySelector('img');
    if (img) {
      img.style.width = '100%'; 
      img.style.height = 'auto';
    }
  
  
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: 'image-region.pdf',
        html2canvas: {
          scale: 2, 
          logging: true,
          useCORS: true,
          allowTaint: true,
          width: 500,  
          height: element.offsetHeight, 
          x: 0,
          y: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        }
      })
      .toPdf()
      .get('pdf')
      .then(() => {

        setShowThankYou(true);
        setTimeout(() => {
          navigate('/home',{ state: { loginType: "user" } }); 
        }, 2000);
      })
      .save();

    element.style.width = `${originalWidth}px`;
};
  
useEffect(() => {
const updateContainerSize = () => {
  if (imageContainerRef.current) {
    setContainerSize({
      width: imageContainerRef.current.offsetWidth,
      height: imageContainerRef.current.offsetHeight,
    });
  }
};

updateContainerSize(); 
window.addEventListener("resize", updateContainerSize); 

return () => {
  window.removeEventListener("resize", updateContainerSize);
};
}, []); 

useEffect(() => {
if (imageSize.width && imageSize.height && updatedRegions.length > 0) {
  const updatedRegionSizes = updatedRegions.map((region) => {
    return {
      ...region,
      x: (region.x / 500) * imageSize.width,
      y: (region.y / 500) * imageSize.height,
      width: (region.width / 500) * imageSize.width,
      height: (region.height / 500) * imageSize.height,
    };
  });

  
  const hasChanges = !updatedRegionSizes.every(
    (region, index) =>
      region.x === updatedRegions[index]?.x &&
      region.y === updatedRegions[index]?.y &&
      region.width === updatedRegions[index]?.width &&
      region.height === updatedRegions[index]?.height
  );

  if (hasChanges) {
    setUpdatedRegions(updatedRegionSizes); 
  }
}
}, [imageSize, updatedRegions]); 

return (
<div className="add-event-container">
<video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '163.2%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      >
        <source src="https://assets.mixkit.co/videos/186/186-720.mp4" type="video/mp4" />
      </video>
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

    {eventData.photo && isCropperVisible && (
      <div className="cropper-container">
        <Cropper
          src={URL.createObjectURL(eventData.photo)}
          style={{ width: "100%", height: "400px" }}
          initialAspectRatio={1}
          guides={false}
          ref={cropperRef}
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

  {updatedRegions && (
     <div
     ref={imageContainerRef}
     style={{
       position: "relative",  
       marginTop: "20px",
       display: "flex",
       alignItems: "center",
       width: "100%",
       maxWidth:"500px",
       height: "auto",  
     }}
   >
     <img
       src={`http://localhost:5000/${event.photo}`}
       alt={event.title}
       style={{
         width: "100%",
         height: "auto",
         objectFit: "contain",
         display: "block",
       }}
     />
     {updatedRegions.map((region, index) => (
       <div
         key={index}
         style={{
           position: "absolute",
           top: `${(region.y / 500) * containerSize.height}px`,
           left: `${(region.x / 500) * containerSize.width}px`,
           width: `${(region.width / 500) * containerSize.width}px`,
           height: `${(region.height / 500) * containerSize.height}px`,
           borderRadius: region.shape === "circle" ? "50%" : "0",
           overflow: "hidden",
         }}
         onClick={() => handleRegionSelect(region.id)}
       >
         {region.type === "photo" ? (
           <img
             src={imgpath}
             alt="Cropped"
             style={{
               position: "absolute",
               top: 0,
               left: 0,
               width: "100%",
               height: "100%",
               objectFit: "cover",
             }}
           />
         ) : region.type === "text" ? (
           participants.map((participant, participantIndex) => {
             const fontSize = Math.min(region.width, region.height) / 4;
             return (
               <div
                 key={participantIndex}
                 className="participant-text"
                 style={{
                   position: "absolute",
                   top: 0,
                   left: 0,
                   width: "100%",
                   height: "100%",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   color: "black",
                   fontSize: `${fontSize}px`,
                   textAlign: "center",
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
   {showThankYou && (
  <div 
    style={{ 
      position: "fixed", 
      top: "50%", 
      left: "50%", 
      transform: "translate(-50%, -50%)", 
      backgroundColor: "rgba(0, 0, 0, 0.8)", 
      color: "white", 
      padding: "20px", 
      borderRadius: "10px", 
      textAlign: "center", 
      zIndex: 1000 
    }}
  >
    <h2 style={{ marginBottom: "10px" }}>Thank You! 🎉</h2>
    <p>Your PDF has been downloaded successfully.</p>
  </div>
)}

    <div ref={pdfContainerRef} className="pdf-content" style={{ marginTop: "20px" }}>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
</div>  
);

};

export default Participate;
