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
        <div className="container mx-auto px-4 py-8">
            {/* main content container */}
            {posts.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-bold mb-2">No Posts Yet</h2>
                    <p className="text-lg mb-6">Be the first to share something amazing!</p>

                    {isAuthenticated === false ? (
                        <div>
                            <p className="mb-4">Login to create posts</p>
                        </div>
                    ) : (
                        <p className="text-blue-600 font-medium">
                            Use the + button below to create your first post!
                        </p>
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
    )
}
