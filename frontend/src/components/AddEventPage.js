// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Rnd } from "react-rnd";

// const UpdateEventPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     photo: null,
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [regionType, setRegionType] = useState("square");
//   const [regions, setRegions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [participants, setParticipants] = useState([]);

//   // Check if an event is being updated
//   const eventToUpdate = location.state?.event;

//   useEffect(() => {
//     if (eventToUpdate) {
//       const { title, description, photo, regions } = eventToUpdate;
//       setEventData({ title, description, photo: null });
//       setRegions(regions);
//       setImagePreview(`http://localhost:5000/${photo}`);
//     }
    
//     // Fetch participants for this event
//     if (eventToUpdate) {
//       axios.get(`http://localhost:5000/api/participate/event/${eventToUpdate._id}`)
//         .then((response) => {
//           setParticipants(response.data.participants);
//         })
//         .catch((error) => {
//           setErrorMessage("Error fetching participants.");
//         });
//     }
//   }, [eventToUpdate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);

//       setEventData((prevData) => ({
//         ...prevData,
//         photo: file,
//       }));
//     }
//   };

//   const handleRegionChange = (e) => {
//     setRegionType(e.target.value);
//   };

//   const addRegion = () => {
//     setRegions((prevRegions) => [
//       ...prevRegions,
//       {
//         id: Date.now(),
//         type: regionType,
//         x: 50,
//         y: 50,
//         width: 100,
//         height: 100,
//         color: "#FF0000",  // Default color (Red)
//       },
//     ]);
//   };

//   const updateRegion = (id, updatedRegion) => {
//     setRegions((prevRegions) =>
//       prevRegions.map((region) =>
//         region.id === id ? { ...region, ...updatedRegion } : region
//       )
//     );
//   };

//   const deleteRegion = (id) => {
//     setRegions((prevRegions) =>
//       prevRegions.filter((region) => region.id !== id)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     const formData = new FormData();
//     formData.append("title", eventData.title);
//     formData.append("description", eventData.description);
//     formData.append("photo", eventData.photo);
//     formData.append("regions", JSON.stringify(regions));

//     try {
//       let response;
//       if (eventToUpdate) {
//         // If event is being updated, use PUT request
//         response = await axios.put(`http://localhost:5000/api/events/${eventToUpdate._id}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       } else {
//         // If new event is being added
//         response = await axios.post("http://localhost:5000/api/events", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       if (response.data.success) {
//         setSuccessMessage(eventToUpdate ? "Event updated successfully!" : "Event added successfully!");
//         navigate("/home", { state: { loginType: "admin" } });
//       } else {
//         setErrorMessage("Failed to save event. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("Error occurred. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   // Update the color of a specific region
//   const handleRegionColorChange = (id, color) => {
//     setRegions((prevRegions) =>
//       prevRegions.map((region) =>
//         region.id === id ? { ...region, color: color } : region
//       )
//     );
//   };

//   return (
//     <div className="update-event-container">
//       <h1>{eventToUpdate ? "Update Event" : "Add New Event"}</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="photo">Event Photo:</label>
//           <input
//             type="file"
//             id="photo"
//             name="photo"
//             accept="image/*"
//             onChange={handleFileChange}
//             required={!eventToUpdate}  // Make the photo field required only if it's a new event
//           />
//         </div>

//         {imagePreview && (
//           <div
//             className="image-container"
//             style={{
//               position: "relative",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "20px",
//               width: "auto",
//               height: "auto",
//             }}
//           >
//             <img
//               src={imagePreview}
//               alt="Event Preview"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 maxWidth: "600px", // Fixed image size, will not resize
//                 objectFit: "contain",
//                 display: "block",
//                 position: "relative",
//               }}
//               id="eventImage"
//             />
//             {regions.map((region) => (
//               <Rnd
//                 key={region.id}
//                 bounds="#eventImage"
//                 size={{ width: region.width, height: region.height }}
//                 position={{ x: region.x, y: region.y }}
//                 onDragStop={(e, d) => {
//                   updateRegion(region.id, { x: d.x, y: d.y });
//                 }}
//                 onResizeStop={(e, direction, ref, delta, position) => {
//                   updateRegion(region.id, {
//                     x: position.x,
//                     y: position.y,
//                     width: parseInt(ref.style.width, 10),
//                     height: parseInt(ref.style.height, 10),
//                   });
//                 }}
//                 onContextMenu={(e) => {
//                   e.preventDefault(); // Prevent default context menu
//                   deleteRegion(region.id); // Delete region on right-click
//                 }}
//                 style={{
//                   border: `2px solid ${region.color}`,
//                   borderRadius: region.type === "circle" ? "50%" : "0",
//                   position: "absolute",
//                 }}
//               >
//                 {/* Conditional Rendering for Regions */}
//                 {region.type === "photo" && (
//                   <div style={{ position: "absolute", width: "100%", height: "100%" }}>
//                     {participants.map((participant) => (
//                       <img
//                         key={participant._id}
//                         src={`http://localhost:5000/uploads/participants/${participant.photo.split('/').pop()}`}
//                         alt={participant.fullName}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           borderRadius: region.type === "circle" ? "50%" : "0",
//                         }}
//                       />
//                     ))}
//                   </div>
//                 )}
//                 {region.type === "text" && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       color: "black",
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       textAlign: "center",
//                     }}
//                   >
//                     {participants.map((participant) => participant.fullName)}
//                   </div>
//                 )}
//               </Rnd>
//             ))}
//           </div>
//         )}

//         <div className="form-group">
//           <label htmlFor="regionType">Region Type:</label>
//           <select
//             id="regionType"
//             name="regionType"
//             value={regionType}
//             onChange={handleRegionChange}
//           >
//             <option value="square">Square</option>
//             <option value="circle">Circle</option>
//           </select>
//           <button
//             type="button"
//             onClick={addRegion}
//             style={{ marginLeft: "10px" }}
//           >
//             Add Region
//           </button>
//         </div>

//         {/* Color picker for each region */}
//         {regions.map((region) => (
//           <div key={region.id} className="form-group">
//             <label htmlFor={`regionColor-${region.id}`}>Region {region.id} Color:</label>
//             <input
//               type="color"
//               id={`regionColor-${region.id}`}
//               value={region.color}
//               onChange={(e) => handleRegionColorChange(region.id, e.target.value)}
//             />
//           </div>
//         ))}

//         <div className="form-group">
//           <label htmlFor="title">Event Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={eventData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Event Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={eventData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <button type="submit">{eventToUpdate ? "Update Event" : "Add Event"}</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateEventPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Rnd } from "react-rnd";

const UpdateEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [regionType, setRegionType] = useState("square");
  const [regions, setRegions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [activeRegionId, setActiveRegionId] = useState(null);
  const [showTypeOptions, setShowTypeOptions] = useState(false);

  const eventToUpdate = location.state?.event;

  useEffect(() => {
    if (eventToUpdate) {
      const { title, description, photo, regions } = eventToUpdate;
      setEventData({ title, description, photo: null });
      setRegions(regions);
      setImagePreview(`http://localhost:5000/${photo}`);
    }

    if (eventToUpdate) {
      axios
        .get(`http://localhost:5000/api/participate/event/${eventToUpdate._id}`)
        .then((response) => {
          setParticipants(response.data.participants);
        })
        .catch((error) => {
          setErrorMessage("Error fetching participants.");
        });
    }
  }, [eventToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setEventData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
  };

  const handleRegionChange = (e) => {
    setRegionType(e.target.value);
  };

  const addRegion = () => {
    setRegions((prevRegions) => [
      ...prevRegions,
      {
        id: Date.now(),
        type: "photo", // Default to photo type
        shape: regionType, // Store the selected shape (square or circle)
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        color: "#FF0000",
      },
    ]);
  };

  const updateRegion = (id, updatedRegion) => {
    setRegions((prevRegions) =>
      prevRegions.map((region) =>
        region.id === id ? { ...region, ...updatedRegion } : region
      )
    );
  };

  const deleteRegion = (id) => {
    setRegions((prevRegions) =>
      prevRegions.filter((region) => region.id !== id)
    );
    setActiveRegionId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("photo", eventData.photo);
    formData.append("regions", JSON.stringify(regions));

    try {
      let response;
      if (eventToUpdate) {
        response = await axios.put(
          `http://localhost:5000/api/events/${eventToUpdate._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/events",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.success) {
        setSuccessMessage(
          eventToUpdate ? "Event updated successfully!" : "Event added successfully!"
        );
        navigate("/home", { state: { loginType: "admin" } });
      } else {
        setErrorMessage("Failed to save event. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleRegionTypeChange = (id, type) => {
    const currentRegion = regions.find((region) => region.id === id);
    updateRegion(id, { type: type }); // Update region type
  };

  const toggleShowTypeOptions = () => {
    setShowTypeOptions(!showTypeOptions);
  };

  return (
    <div className="update-event-container">
      <h1>{eventToUpdate ? "Update Event" : "Add New Event"}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Event Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required={!eventToUpdate}
          />
        </div>

        {imagePreview && (
          <div
            className="image-container"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              width: "auto",
              height: "auto",
            }}
          >
            <img
              src={imagePreview}
              alt="Event Preview"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "600px",
                objectFit: "contain",
                display: "block",
                position: "relative",
              }}
              id="eventImage"
            />
            {regions.map((region) => (
              <Rnd
                key={region.id}
                bounds="#eventImage"
                size={{ width: region.width, height: region.height }}
                position={{ x: region.x, y: region.y }}
                onDragStop={(e, d) => {
                  updateRegion(region.id, { x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateRegion(region.id, {
                    x: position.x,
                    y: position.y,
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                  });
                }}
                style={{
                  border: `2px solid ${region.color}`,
                  borderRadius: region.shape === "circle" ? "50%" : "0",
                  position: "absolute",
                }}
                onDoubleClick={() => setActiveRegionId(region.id)} // Changed to double-click
              >
                {region.type === "photo" && (
                  <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                    {participants.map((participant) => (
                      <img
                        key={participant._id}
                        src={`http://localhost:5000/uploads/participants/${participant.photo.split("/").pop()}`}
                        alt={participant.fullName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: region.shape === "circle" ? "50%" : "0",
                        }}
                      />
                    ))}
                  </div>
                )}
                {region.type === "text" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {participants.map((participant) => participant.fullName)}
                  </div>
                )}
              </Rnd>
            ))}
            {activeRegionId && (
              <div
                className="region-buttons"
                style={{
                  position: "absolute",
                  top: `${regions.find((region) => region.id === activeRegionId).y}px`,
                  left: `${regions.find((region) => region.id === activeRegionId).x + 10}px`,
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => deleteRegion(activeRegionId)}
                  style={{ marginRight: "5px" }}
                >
                  Delete
                </button>
                <button onClick={toggleShowTypeOptions}>
                  Change Type
                </button>
                {showTypeOptions && (
                  <div>
                    <button
                      onClick={() =>
                        handleRegionTypeChange(activeRegionId, "photo")
                      }
                    >
                      Photo
                    </button>
                    <button
                      onClick={() => handleRegionTypeChange(activeRegionId, "text")}
                    >
                      Text
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="regionType">Select Region Type:</label>
          <select id="regionType" value={regionType} onChange={handleRegionChange}>
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>
          <button type="button" onClick={addRegion}>
            Add Region
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Event Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {eventToUpdate ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;

