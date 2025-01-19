import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateEventPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event, loginType } = state; 
  const [eventData, setEventData] = useState({
    title: event.title,
    description: event.description,
    photo: event.photo || null, // Use event's photo URL if it exists
  });
  const [errorMessage, setErrorMessage] = useState(''); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEventData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    if (eventData.photo) formData.append('photo', eventData.photo);

    try {
      const endpoint = `http://localhost:5000/api/events/${event._id}`;

      const response = await axios.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        alert('Event updated successfully!');
        navigate('/home', { state: { loginType: 'admin' } }); // Redirect to admin home page
      } else {
        setErrorMessage('Failed to update event. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Update event error:', error);
    }
  };

  return (
    <div className="update-event-container">
      <h1>Update Event</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Event Photo:</label>
          {eventData.photo && (
            <div className="existing-image">
              <img
                src={`http://localhost:5000/${eventData.photo}`} // Assuming eventData.photo contains the image path
                alt="Event"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
          )}
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
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

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
