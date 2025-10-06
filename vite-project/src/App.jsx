import React, { useState, useEffect } from 'react'
import PostCard from './components/PostCard'
import api, { postAPI , userAPI} from './services/api'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPost from './pages/AddPost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  
  const [user, setUser] = useState(null);

    // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <Router>
      <Header
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
      />
      <Routes>
        <Route path="/" element={
          <Home 
            user={user}
            isAuthenticated={false}
          />} />
        <Route path="/login" element={
          <Login 
            onLogin={login}
          />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={
          <AddPost 
            user={user}
            isAuthenticated={isAuthenticated}
          />} />
      </Routes>





    </Router>
  )
}
