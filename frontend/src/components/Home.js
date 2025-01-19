// Home.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginType } = location.state || {}; // Default to undefined if state is not provided
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data); // Store events data in state
      })
      .catch((error) => {
        console.error('There was an error fetching events:', error);
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

  const handleUpdate = (event) => {
    navigate('/update-event', { state: { event } });
  };

  const handleImageClick = (event) => {
    if (loginType === 'user') {
      navigate('/participate', { state: { event } });
    }
  };

  return (
    <div className="page-content flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ZAVA</h2>
      {loginType === 'admin' ? (
        <p className="text-lg text-green-700 bg-green-100 p-4 rounded-md shadow-md">
          Welcome to the Admin Page
        </p>
      ) : (
        <p className="text-lg text-blue-700 bg-blue-100 p-4 rounded-md shadow-md">
          This is the home page of your MERN stack project.
        </p>
      )}

      <div className="event-list mt-8">
        {events.length === 0 ? (
          <p className="text-gray-500">No events available at the moment.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="event-item mb-6 p-4 bg-white rounded-lg shadow-md relative group"
            >
              <img
                src={`http://localhost:5000/${event.photo}`}
                alt={event.title}
                className="event-image mb-4 w-full h-64 object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(event)}
              />
              <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>

              {loginType === 'admin' && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md m-2"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md m-2"
                    onClick={() => handleUpdate(event)}
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