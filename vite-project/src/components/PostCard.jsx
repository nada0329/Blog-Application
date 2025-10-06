import React , { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post, onDelete, canDelete = false, currentUser }) {

  const isPostOwner = currentUser && (post.userId === currentUser.id);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown date';
    }
  };

  const [imageError, setImageError] = useState(false);

  const handleImgError = () => {
    setImageError(true);
  };

  if (!post) 
    return <div className="text-center text-gray-500">Loading post…</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 w-full max-w-4xl mx-auto my-6 hover:shadow-xl transition-shadow duration-300">
      {/* TITLE + "Your Post" badge - Enhanced */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 break-words leading-tight flex-1 pr-4">
          {post.title}
        </h2>
        {isPostOwner && (
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full ml-2 flex-shrink-0 font-medium">
            Your Post
          </span>
        )}
      </div>

      {/* CONTENT - Enhanced */}
      <p className="text-gray-700 mb-6 whitespace-pre-line break-words leading-relaxed text-base md:text-lg">
        {post.content}
      </p>

      {/* IMAGE - Enhanced with dynamic ratio */}
      {post.imageUrl && !imageError && (
        <div className="mb-6 flex justify-center">
            <div className="relative max-w-full rounded-xl shadow-md bg-gray-100">
                <img
                src={post.imageUrl}
                alt={post.title}
                className="max-w-full max-h-96 object-contain rounded-xl"
                onError={handleImgError}
                />
            </div>
        </div>
      )}
      
      {/* Image error message - Enhanced */}
      {post.imageUrl && imageError && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm flex items-center">
          <span className="mr-2">🖼️</span>
          Image could not be loaded
        </div>
      )}

      {/* FOOTER - Enhanced */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="font-medium">By {post.author}</span> • {formatDate(post.date)}
        </div>

        {canDelete && isPostOwner && (
          <div className="flex space-x-2">
            {/* Edit Button */}
            <Link
              to={`/edit-post/${post.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Edit
            </Link>
            {/* Delete Button */}
            <button
              onClick={() => onDelete(post.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}