import React from 'react'
import PostCard from '../components/PostCard'
import api, { postAPI, userAPI } from '../services/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home({ user, isAuthenticated }) {

    const [posts, setPosts] = useState([]);
    
    // get all posts from backend -- only once on load
    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const response = await postAPI.getAll();
        setPosts(response.data);
    };

    const handleDeletePost = async (id) => {
        // user to confirm delete operation
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        // remove from db
        await postAPI.delete(id);
        // remove from UI
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div className={`min-h-screen ${posts.length === 0 
            ? 'bg-gradient-to-br from-blue-50 to-indigo-100' 
            : 'bg-gray-50'}`}>
            
            <div className="container mx-auto px-4 py-8">
                {/* main content container */}
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-6">✨</div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Blog Awaits Your Story</h2>
                        <p className="text-lg mb-8 text-gray-600 max-w-md mx-auto">
                            Share your thoughts, experiences, and moments with the world. Your first post is just a click away!
                        </p>
                        
                        {/* Interactive Call-to-Action Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="text-3xl mb-3">📝</div>
                                <h3 className="font-semibold mb-2 text-gray-800">Write a Story</h3>
                                <p className="text-sm text-gray-600">Share your thoughts, tutorials, or experiences with the community</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="text-3xl mb-3">🖼️</div>
                                <h3 className="font-semibold mb-2 text-gray-800">Add Images</h3>
                                <p className="text-sm text-gray-600">Include photos to make your posts more engaging and visual</p>
                            </div>
                        </div>

                        {isAuthenticated ? (
                            <p className="text-blue-600 font-medium text-lg animate-pulse">
                                👇 Click the + button below to get started!
                            </p>
                        ) : (
                            <div>
                                <p className="mb-4 text-gray-600">Join our community to start sharing</p>
                                <Link 
                                    to="/login"
                                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    Login to Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    /* stacked vertical list: each PostCard rendered full-width (PostCard centered by its own max-width) */
                    <div className="flex flex-col gap-0 justify-center items-center">
                        {
                            posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onDelete={handleDeletePost}
                                    canDelete={true}
                                    currentUser={user}
                                />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}