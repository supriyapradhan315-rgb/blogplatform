# Blog Platform

A full-stack blog platform built with React.js, Node.js, Express.js, and MongoDB.

## Features

- User authentication (register, login, logout)
- Create, read, update, delete blog posts
- Add and delete comments on posts
- Responsive UI with Tailwind CSS
- JWT-based authentication
- Protected routes

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../client
   npm install
   ```
4. Set up environment variables in `server/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/blogplatform
   JWT_SECRET=your_jwt_secret_here
   ```

### Running the Application

1. Start MongoDB
2. Start the backend server:
   ```
   cd server
   npm run dev
   ```
3. Start the frontend:
   ```
   cd client
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Posts
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id

### Comments
- GET /api/comments/:postId
- POST /api/comments/:postId
- DELETE /api/comments/:id

## Deployment

- Frontend: Deploy to Vercel
- Backend: Deploy to Render
- Database: MongoDB Atlas

## License

ISC