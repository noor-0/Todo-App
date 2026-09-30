# Todo App

A simple full-stack Todo application where users can create projects and manage their tasks.

## Features

- User signup and login
- JWT-based authentication
- Create and manage projects
- Create, update, and delete tasks
- Mark tasks as completed
- Filter tasks by:
  - All tasks
  - Pending tasks
  - Completed tasks
  - Project
- Tasks grouped by project
- Responsive dashboard with sidebar and header
- Logout functionality

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- JWT
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas


## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd Todo-App
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd server
npm install
npm start
```

## Environment Variables

### Backend

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit your `.env` files to GitHub.
