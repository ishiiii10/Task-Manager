# Task Manager Backend

This is the backend API for the Task Manager application, built with Node.js, Express, and MongoDB.

## Features

- RESTful API architecture
- JWT authentication
- MongoDB database with Mongoose ODM
- CRUD operations for tasks
- User authentication and authorization
- Error handling middleware

## API Endpoints

### User Routes

| Method | Endpoint           | Description                 | Request Body                    | Response                       |
|--------|--------------------|-----------------------------|--------------------------------|--------------------------------|
| POST   | /api/users/register | Register a new user         | `{ name, email, password }`    | `{ id, name, email, token }`   |
| POST   | /api/users/login    | Login a user                | `{ email, password }`          | `{ id, name, email, token }`   |

### Task Routes

| Method | Endpoint           | Description                 | Request Body                    | Response                       |
|--------|--------------------|-----------------------------|--------------------------------|--------------------------------|
| GET    | /api/tasks         | Get all tasks for user      | -                              | Array of tasks                 |
| POST   | /api/tasks         | Create a new task           | `{ title, description }`       | Created task object            |
| PUT    | /api/tasks/:id     | Update a task               | `{ title, description, completed }` | Updated task object      |
| DELETE | /api/tasks/:id     | Delete a task               | -                              | Success message                |

## Authentication

All task routes require a valid JWT token in the request header:

```
Authorization: Bearer [your_jwt_token]
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```
4. Start the server: `npm run dev`

## Project Structure

```
backend/
├── controllers/          # Request handlers
│   ├── taskController.js # Task-related controllers
│   └── userController.js # User-related controllers
├── middleware/
│   └── authMiddleware.js # JWT authentication middleware
├── models/
│   ├── taskModel.js      # Mongoose task model
│   └── userModel.js      # Mongoose user model
├── routes/
│   ├── taskRoutes.js     # Task-related routes
│   └── userRoutes.js     # User-related routes
└── server.js             # Entry point
```

## Dependencies

See `requirements.txt` for the list of dependencies with versions.

## License

This project is licensed under the MIT License. 