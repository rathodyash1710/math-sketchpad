import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  text-decoration: underline;
  margin: 0;

  a {
    color: white;
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ff6f61;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.div`
  margin-left: auto;
  border:1px solid white;
  border-radius:20px;
  padding:10px;
  color:black;
  margin-right:10px;
  background-color: darkblue ;
  cursor:pointer;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ff6f61;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  display: ${(props) => (props.$show === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  position: absolute;
  border-radius: 40px;
  top: 70px;
  left: 0;
  background-color: #333;
  width: 100%;
  padding: 1rem;
  z-index:10;

  a {
    color: white;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    text-decoration: none;
  }

  a:hover {
    color: #ff6f61;
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.$show === 'true' ? 'flex' : 'none')};
  }
`;

const Navbar = ({ isLogin, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <Logo>
        <Link to="/">MathSketchPad</Link>
      </Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/canvas">Canvas</Link>
        <Link to="/history">History</Link>
        <Link to="/download">Download</Link>
        <Link to="/help">Help</Link>
        {
          isLogin ?
            <LoginButton onClick={logout}>Logout</LoginButton>
            :
            <LoginButton><Link to="/login">Login/Signup</Link></LoginButton>
        }
      </NavLinks>
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </MobileMenuButton>
      <MobileNav $show={isOpen.toString()}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/canvas" onClick={toggleMenu}>Canvas</Link>
        <Link to="/history" onClick={toggleMenu}>History</Link>
        <Link to="/download" onClick={toggleMenu}>Download</Link>
        <Link to="/help" onClick={toggleMenu}>Help</Link>
        {
          isLogin ?
            <LoginButton onClick={logout}>Logout</LoginButton>
            :
            <LoginButton><Link to="/login">Login/Signup</Link></LoginButton>
        }
      </MobileNav>
    </Nav>
  );
};

export default Navbar;
