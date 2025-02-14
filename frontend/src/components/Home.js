import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginType } = location.state || {};
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents(events.filter((event) => event._id !== id));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  // Function to handle update
  const handleUpdate = (event) => {
    navigate('/update-event', { state: { event } });
  };

  // Function to handle image click
  const handleImageClick = (event) => {
    if (loginType === 'user') {
      navigate('/participate', { state: { event } });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '131.2%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      >
        <source src="https://assets.mixkit.co/videos/186/186-720.mp4" type="video/mp4" />
      </video>

      {/* Events Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%',
          maxWidth: '300px',
          height: '400px',
          padding: '40px 20px',
          zIndex: '1', // Content goes on top of the video
        }}
      >
        {events.length === 0 ? (
          <p
            style={{
              color: '#666',
              fontSize: '1.2rem',
              textAlign: 'center',
            }}
          >
            No events available at the moment.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              style={{
                position: 'relative',
                width: '350px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '8px',
                padding: '20px',
                margin: '20px',
                textAlign: 'center',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.03)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              {/* Event Image */}
              <div
                style={{
                  width: '100%',
                  height: '250px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                <img
                  src={`http://localhost:5000/${event.photo}`}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onClick={() => handleImageClick(event)}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                />
              </div>
              {/* Event Title */}
              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                {event.title}
              </h3>
              {/* Event Description */}
              <p
                style={{
                  fontSize: '1rem',
                  color: '#ffffff',
                  marginBottom: '12px',
                  paddingHorizontal: '10px',
                }}
              >
                {event.description}
              </p>
              {/* Admin Buttons */}
              {loginType === 'admin' && (
                <div>
                  <button
                    style={{
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                      background: '##D3D3D3',
                      color: '#333333',
                      marginRight: '10px',
                      transition: 'background 0.3s ease',
                    }}
                    onClick={() => handleDelete(event._id)}
                    onMouseOver={(e) => (e.target.style.background = '##D3D3D3')}
                    onMouseOut={(e) => (e.target.style.background = '##D3D3D3')}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                      background: '##D3D3D3',
                      color: '#333333',
                      transition: 'background 0.3s ease',
                    }}
                    onClick={() => handleUpdate(event)}
                    onMouseOver={(e) => (e.target.style.background = '##D3D3D3')}
                    onMouseOut={(e) => (e.target.style.background = '##D3D3D3')}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
