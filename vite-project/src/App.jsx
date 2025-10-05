import React, { useState, useEffect } from 'react'
import PostCard from './components/PostCard'
import api, { postAPI , userAPI} from './services/api'

export default function App() {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  const loadPosts = async () => {
    const response = await postAPI.getAll();
    setPosts(response.data);
  }

  const loadUsers = async () => {
    const response = await userAPI.getAll();
    setUsers(response.data);
  }

  const handleDeletePost = async (id) => {
    await postAPI.delete(`/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  }


  return (
    <div><PostCard 
    post={posts[0]}
    onDelete={handleDeletePost}
    canDelete={true}
    currentUser={users[0]}

    /></div>
  )
}
