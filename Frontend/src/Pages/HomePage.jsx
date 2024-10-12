import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import F1 from '../assets/F1.jpg';
import F2 from '../assets/F2.jpg';
import F4 from '../assets/F4.png';
import F5 from '../assets/F5.png';
import F6 from '../assets/F6.png';

const Container = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #121212;
  color: #ffffff;
  text-align: center;
  padding-top: 50px; 
  padding-bottom: 80px; 
  gap: 10px;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('https://i.pinimg.com/564x/23/4d/ed/234ded4e30121cf7343e8a66faa51e38.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  height: 70vh;
  width: 90%;
  color: black;
  text-align: center;
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(5px); 
  box-shadow: 0 8px 16px #4169E1;
  margin-bottom: 5rem;
  animation: fadeIn 2s ease-in-out;

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: fadeIn 2s ease-in-out;
    }
    
    p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    animation: slideIn 2s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  animation: fadeInUp 1.5s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @keyframes fadeInUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
`;

const SectionImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: zoomIn 1.5s ease-in-out;

  @keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const SectionText = styled.div`
  max-width: 500px;
  margin: 1rem;
  color: black;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-decoration:underline;
    animation: fadeInLeft 1.5s ease-in-out;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    animation: fadeInRight 1.5s ease-in-out;
  }

  @keyframes fadeInLeft {
    from { transform: translateX(-50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeInRight {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  color: #ffffff;
  background-color: darkblue;
  text-decoration: none;
  border-radius: 8px;
  margin: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #4169E1;
  }
`;

const HomePage = ({ isLogin }) => {
  return (
    <Container>
      <HeroSection>
        <h1>Welcome to MathSketchPad</h1>
        <p>Draw mathematical expressions on the canvas and let our advanced AI evaluate them for you. Start exploring now!</p>

        {
          !isLogin ?
            <div style={{ display: 'flex' }}>
              <Button to="/canvas">Get Started</Button>
              <Button to="/login">Login / Signup</Button>
              <Button to="/download">Download</Button>
            </div> : null
        }
      </HeroSection>

      <Section>
        <SectionImage src={F1} alt="Advanced AI Technology" />
        <SectionText>
          <h2>Advanced AI Technology</h2>
          <p>Our AI-powered engine can accurately evaluate and solve complex mathematical expressions drawn on the canvas.</p>
        </SectionText>
      </Section>

      <Section>
        <SectionText>
          <h2>Easy to Use Interface</h2>
          <p>With a user-friendly design, you can draw and interact with your mathematical expressions effortlessly.</p>
        </SectionText>
        <SectionImage src={F4} alt="Easy to Use Interface" />
      </Section>

      <Section>
        <SectionImage src={F2} alt="Collaborate and Share" />
        <SectionText>
          <h2>Collaborate and Share</h2>
          <p>Share your work with others easily. Collaborate on complex equations and problem-solving with friends or colleagues.</p>
        </SectionText>
      </Section>

      <Section>
        <SectionText>
          <h2>History and Export Options</h2>
          <p>Keep track of all your calculations and easily export your work in various formats for future reference or presentation.</p>
        </SectionText>
        <SectionImage src={F6} alt="History and Export Options" />
      </Section>

      <Section>
        <SectionImage src={F5} alt="Customization Features" />
        <SectionText>
          <h2>Customization Features</h2>
          <p>Customize the canvas and interface to suit your personal preferences. Change colors, line styles, and more to enhance your experience.</p>
        </SectionText>
      </Section>

      <Section>
        <SectionText>
          <h2>Mobile and Desktop Versions</h2>
          <p>Access MathSketchPad on both desktop and mobile devices. Enjoy a seamless experience across all platforms.</p>
        </SectionText>
        <SectionImage src={F2} alt="Mobile and Desktop Versions" />
      </Section>
    </Container>
  );
};

export default HomePage;