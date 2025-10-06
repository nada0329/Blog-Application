# Blog-Application
 Blog Application using React.js
:

📝 Share The Moment - React Blog Application
A beautiful, full-featured blogging platform built with React where users can share their special moments with the community.

🚀 Features
✨ Core Functionality
User Authentication - Secure registration and login system

Create Posts - Share moments with titles, content, and images

Edit & Delete - Full CRUD operations for your own posts

Responsive Design - Works perfectly on desktop and mobile

Real-time Updates - Instant UI updates without page refresh

🎨 User Experience
Modern UI - Clean, professional design with Tailwind CSS

Floating Action Button - Quick access to create new posts

Image Support - Display images with smart aspect ratio handling

Ownership Badges - Visual indicators for your own posts

Loading States - Smooth user experience during operations

🔒 Security & Validation
Protected Routes - Authentication required for sensitive actions

Ownership Checks - Users can only edit/delete their own posts

Form Validation - Client-side validation for all user inputs

Persistent Login - Users stay logged in across browser sessions

🛠️ Tech Stack
Frontend: React 18, React Router DOM

Styling: Tailwind CSS

Backend: JSON Server (REST API)

HTTP Client: Axios

Icons: Heroicons (SVG)

📁 Project Structure
src/
   / components/          # Reusable UI components
      / FloatingAddButton.js
      / Header.js
      / PostCard.js
   / pages/              # Page components
      / AddPost.js
      / EditPost.js
      / Home.js
      / Login.js
      / Register.js
   / services/           # API integration
      / api.js
   / App.js             # Main application component
*****************************************************************************************************
make sure you run backend json server-> json-server --watch db.json --port 3001
run your app-> npm run dev

some users already exists to try them 
---
"name": "user1"
"email": "user1@user.com"
"password": "123456"
----
"name": "user2"
"email": "user2@user.com"
"password": "1234567"
---
"name": "user3"
"email": "user3@user.com"
"password": "12345678"
