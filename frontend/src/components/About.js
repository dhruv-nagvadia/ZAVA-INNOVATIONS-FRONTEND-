import React from 'react';

const About = () => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        color: '#ffffff',
        textAlign: 'center',
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
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      >
        <source src="https://assets.mixkit.co/videos/186/186-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div
        style={{
          zIndex: '1',
          padding: '20px',
          maxWidth: '600px',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '16px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          About Us
        </h2>
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
          }}
        >
          Learn more about our project and mission here. We aim to deliver quality solutions to
          help you achieve your goals and make a positive impact on the world.
        </p>
      </div>
    </div>
  );
};

export default About;
