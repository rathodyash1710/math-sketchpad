// src/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  bottom: 0;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 MathScratchPad. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
