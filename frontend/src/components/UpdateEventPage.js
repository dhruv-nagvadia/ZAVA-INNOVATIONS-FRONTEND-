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
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    regionId: null,
  });

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
        .catch(() => {
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
        type: regionType,
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
        response = await axios.post("http://localhost:5000/api/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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

  const showContextMenu = (e, id) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      regionId: id,
    });
  };

  const handleContextMenuOption = (option) => {
    const regionId = contextMenu.regionId;
    if (option === "delete") {
      deleteRegion(regionId);
    } else if (option === "type") {
      const newType = window.prompt("Enter type (image/text):", "image");
      if (newType === "image" || newType === "text") {
        updateRegion(regionId, { type: newType });
      } else {
        alert("Invalid type. Please enter 'image' or 'text'.");
      }
    }
    setContextMenu({ visible: false, x: 0, y: 0, regionId: null });
  };

  return (
    <div className="update-event-container" onClick={() => setContextMenu({ visible: false })}>
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
                onContextMenu={(e) => showContextMenu(e, region.id)}
                style={{
                  border: `2px solid ${region.color}`,
                  borderRadius: region.type === "circle" ? "50%" : "0",
                  position: "absolute",
                }}
              ></Rnd>
            ))}
          </div>
        )}

        {contextMenu.visible && (
          <div
            style={{
              position: "absolute",
              top: contextMenu.y,
              left: contextMenu.x,
              backgroundColor: "white",
              border: "1px solid black",
              zIndex: 1000,
            }}
          >
            <button onClick={() => handleContextMenuOption("type")}>Type</button>
            <button onClick={() => handleContextMenuOption("delete")}>Delete</button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="regionType">Region Type:</label>
          <select
            id="regionType"
            name="regionType"
            value={regionType}
            onChange={handleRegionChange}
          >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>
          <button
            type="button"
            onClick={addRegion}
            style={{ marginLeft: "10px" }}
          >
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
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          {eventToUpdate ? "Update Event" : "Add Event"}
        </button>
      </form>

      {participants.length > 0 && (
        <div className="participants-section">
          <h2>Participants:</h2>
          <ul>
            {participants.map((participant) => (
              <li key={participant._id}>
                {participant.name} ({participant.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpdateEventPage;
