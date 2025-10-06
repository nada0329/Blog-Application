import React from 'react'
import { Link } from 'react-router-dom'


export default function Header({ user, isAuthenticated, onLogout }) {
  return (
    <header className="bg-green-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Share The Moment</Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/" className="hover:text-green-200 transition-colors">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                {/* Keep Add Post in header for desktop users */}
                <Link to="/add-post" className="hover:text-green-200 transition-colors hidden md:block">
                  Add Post
                </Link>
                <span className="text-lime-200">Welcome, {user?.name}</span>
                <button 
                  onClick={onLogout}
                  className="bg-green-400 hover:bg-green-500 px-3 py-1 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
    
  )
}
