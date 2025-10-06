import React , { useState } from 'react'
import api, { postAPI } from '../services/api'
import { useNavigate } from 'react-router-dom'


export default function AddPost({ user, isAuthenticated }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Image URL state
    const navigate = useNavigate();
    const [pauseTillAdd, setPauseTillAdd] = useState(false);

    // in case user logout while creating a post
    if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need to be logged in to add posts.</p>
      </div>
    );}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPauseTillAdd(true);

        // validation of input data
        if (title.trim()==="" || content.trim()==="") {
            alert('Please fill in all fields');
            setPauseTillAdd(false);
            return;
        }

        // create the post 
        const newPost = {
        title: title,  // only text with no spaces in beginning or end
        content: content,
        imageUrl: imageUrl.trim(), // only link with no spaces in beginning or end
        author: user.name,
        date: new Date().toISOString(),
        userId: user.id
        };
        // save it in db and move to home
        const response = await postAPI.create(newPost);
        navigate('/');

        setPauseTillAdd(false);
    };
  

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Post</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
        </div>

        {/* NEW: Image URL Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter a direct link to your image. Supported formats: JPG, PNG, GIF
          </p>
          <p className="text-xs text-gray-500 mt-1">
            use these URLs for random img <br/>
            "https://picsum.photos/800/400"    // Landscape (2:1)   <br/>
            "https://picsum.photos/400/800"    // Portrait (1:2)    <br/> 
            "https://picsum.photos/600/600"    // Square (1:1)   <br/>
            "https://picsum.photos/1200/300"   // Very wide (4:1)   <br/>
            "https://picsum.photos/300/1200"   // Very tall (1:4)   <br/>
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-48"
            placeholder="Write your post content..."
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={pauseTillAdd}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {pauseTillAdd ? 'Publishing...' : 'Publish Post'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
);
}
