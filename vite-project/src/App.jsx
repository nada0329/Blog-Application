import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import FloatingAddButton from './components/FloatingAddButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  
  const [user, setUser] = useState(null);

  // this logic to maintain user login in browser data
  // Check for saved user data when app loads
  useEffect(() => {
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));      
    }
  }, []);

    // Login function
  const login = (userData) => {
    setUser(userData);
    // Save user data to local storage
    localStorage.setItem('blogUser', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Remove user data from local storage
    localStorage.removeItem('blogUser');
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
            isAuthenticated={isAuthenticated}
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
        <Route path="/edit-post/:id" element={
          <EditPost 
            user={user}
            isAuthenticated={isAuthenticated}
          />} />  
      </Routes>
      {/* Show floating button only when user is authenticated */}
      {isAuthenticated && <FloatingAddButton />}

    </Router>
  )
}
