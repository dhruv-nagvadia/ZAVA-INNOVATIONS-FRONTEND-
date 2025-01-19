import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Participate = () => {
  const [eventData, setEventData] = useState({
    fullName: '',
    contactNo: '',
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {}; // Receive event details from Home.js

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
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('fullName', eventData.fullName);
    formData.append('contactNo', eventData.contactNo);
    formData.append('photo', eventData.photo);

    try {
      const response = await axios.post('http://localhost:5000/api/participate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccessMessage('Participant added successfully!');
        navigate('/generate-pass', {
          state: {
            eventImage: event.photo, // Event image passed from the previous page
            uploadedImage: URL.createObjectURL(eventData.photo), // Convert uploaded file to URL
            participantName: eventData.fullName, // Pass participant's name
          },
        });
      } else {
        setErrorMessage(response.data.message || 'Failed to add participant. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

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
    </div>
  );
};

export default Participate;
