import React, { useState, useEffect } from 'react'
import api, { postAPI } from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost({ user, isAuthenticated }) {
    // get post id from the URL called it 
    const { id } = useParams();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [pauseTillUpdate, setPauseTillUpdate] = useState(false);
    const navigate = useNavigate();

    // in case user logout while editing a post
    if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">Access Denied</h1>
          <p className="text-gray-600 text-center">You need to be logged in to edit posts.</p>
        </div>
      </div>
    );}

    const loadPost = async () => {
            
        const response = await postAPI.getById(id);
        const post = response.data;          
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl || '');
            
    };

    // load post data
    useEffect(() => {
        loadPost();
    }, [id]);

    // when form submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        setPauseTillUpdate(true);

        // Validation of input data
        if (title.trim() === "" || content.trim() === "") {
            alert('Please fill in all fields');
            setPauseTillUpdate(false);
            return;
        }

        // Update the post
        const updatedPost = {
            id: id,
            title: title.trim(),
            content: content,
            imageUrl: imageUrl.trim(),
            author: user.name,
            date: new Date().toISOString(), // Update the date to now
            userId: user.id
        };
        // put data in db and move to home
        await postAPI.update(updatedPost);
        navigate('/');
        setPauseTillUpdate(false);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter post title"
                                maxLength={100}
                            />
                            <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/image.jpg"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Enter a direct link to your image. Supported formats: JPG, PNG, GIF
                            </p>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Content
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-48"
                                placeholder="Write your post content..."
                            />
                        </div>
                        
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={pauseTillUpdate}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
                            >
                                {pauseTillUpdate ? 'Updating...' : 'Update Post'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}