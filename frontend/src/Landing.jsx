import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-nav">
          <h2 className="logo">EventBooking</h2>
          <div className="nav-buttons">
            <button onClick={() => navigate('/login')} className="btn btn-small">Login</button>
            <button onClick={() => navigate('/register')} className="btn btn-small btn-light">Register</button>
          </div>
        </div>

        <div className="hero-content">
          <h1>Book Your Events Effortlessly</h1>
          <p>Discover, book, and manage events all in one place.</p>
          <button onClick={() => navigate('/register')} className="btn btn-light">Get Started</button>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Event Booking System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
