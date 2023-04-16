import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const About = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/branded-aluber.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative', // Add relative positioning
          textAlign: 'center',
          color: '#fff', // Updated color to white for better contrast
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add background color with opacity
          padding: '1rem', // Add padding for spacing
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
          }}
        >
          About this site:
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6',
            marginBottom: '2rem', 
          }}
        >
          This page is meant to allow you to build your own Yu-gi-oh deck. Every single released card currently is available to pick. 
          Once you're happy with your deck, save it, name it and it will be saved. Currently you can only make one deck at a time.
          If you want to see a suggested deck, click on the button below!
        </p>
        <Link to="/decks" className="button"> 
          Suggested deck
        </Link>
      </div>
    </div>
  );
};

export default About;
