import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ACCESS_TOKEN, CLEAR_ACCESS_TOKEN } from './constants';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';

import HomePage from './Pages/HomePage';
import CanvasPage from './Pages/CanvasPage';
import LoginPage from './Pages/LoginPage';
import DownloadPage from './Pages/DownloadPage';
import HistoryPage from './Pages/History';
import SignUp from './Pages/SignUp';
import HelpPage from './Pages/HelpPage';
import api from './api';

const App = () => {
  const [isLogin, setLogin] = useState(false);

  useLayoutEffect(() => {
    const token = ACCESS_TOKEN();
    const savedLoginState = localStorage.getItem('isLogin');

    if (token && savedLoginState === 'true') {
      setLogin(true);
    }
  }, [isLogin]);

  function handleLogin() {
    setLogin(true);
    localStorage.setItem('isLogin', 'true');
  }

  async function logout(e) {
    e.preventDefault();
    try {
      const response = await api.post('auth/logout/');
      if (response.status == 200) {
        console.log('Logout Successfully');
        setLogin(false);
        CLEAR_ACCESS_TOKEN();
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Router>
      <Navbar isLogin={isLogin} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage isLogin={isLogin} logout={logout} />} />
        <Route path="/login" element={<LoginPage setLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route
          path="/canvas"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <CanvasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
