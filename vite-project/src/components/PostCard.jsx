import React , { useState } from 'react'

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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-full max-w-2xl mx-auto my-6">
      {/* TITLE + "Your Post" badge */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-gray-800 break-words">{post.title}</h2>
        {isPostOwner && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2 flex-shrink-0">
            Your Post
          </span>
        )}
      </div>

      {/* CONTENT */}
      <p className="text-gray-600 mb-4 whitespace-pre-line break-words">{post.content}</p>

      {/* IMAGE */}
      {post.imageUrl && (
        <div className="mb-4">
          <div className="relative w-full max-h-96 overflow-hidden rounded-lg shadow-sm bg-gray-100">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-96 object-contain"
              onError={handleImgError}
              style={{ display: imageError ? 'none' : 'block' }}
            />
          </div>
        </div>
      )}
      {post.imageUrl && imageError===true && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          🖼️ Image could not be loaded
        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-gray-500">
          By {post.author} • {formatDate(post.date)}
        </div>

        {canDelete && isPostOwner && (
          <button
            onClick={() => onDelete(post.id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
