import React, { useState, useEffect } from 'react'
import PostCard from './components/PostCard'
import api, { postAPI , userAPI} from './services/api'
import Home from './pages/Home';

export default function App() {

  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);


  const loadUsers = async () => {
    const response = await userAPI.getAll();
    setUsers(response.data);
  }




  return (
    <div>
      <Home 
      user={users[0]}
      isAuthenticated={false}
      />
    </div>
  )
}
