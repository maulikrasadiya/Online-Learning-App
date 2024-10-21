# Course Management Backend System

This project is a backend API for managing courses, user authentication, enrollment, and progress tracking. The backend is built using **Node.js**, **Express.js**, and **MongoDB**, and follows the **MVC (Model-View-Controller)** architecture. The project includes user authentication (using **JWT**), role-based access for admin functionalities, course CRUD operations, and user enrollment and lesson tracking.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Features

- **User Authentication**: Registration, login, and token-based authentication using **JWT**.
- **Admin Role**: Admin users can create, update, and delete courses.
- **User Enrollment**: Users can enroll in courses and track their progress.
- **Progress Tracking**: Track lesson completion for enrolled courses.
- **Secure Routes**: Protected routes using JWT middleware to restrict access.
- **Error Handling**: API uses `try...catch` blocks to handle errors gracefully.

## Project Structure

The project is structured using the MVC architecture, where:
- **Models** define the structure of the data (e.g., User, Course, Enrollment).
- **Controllers** contain the business logic and handle requests and responses.
- **Routes** define the API endpoints and map them to controller actions.

```
.
├── config/
│   └── db.js                # MongoDB connection setup
├── controllers/
│   ├── authController.js     # Authentication logic (register, login)
│   └── courseController.js   # Course creation, enrollment, progress tracking
├── middleware/
│   └── authMiddleware.js     # JWT verification middleware
├── models/
│   ├── Course.js             # Course model
│   ├── Enrollment.js         # Enrollment model
│   └── User.js               # User model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   └── courseRoutes.js       # Course-related routes
├── .env                      # Environment variables (not included in version control)
├── app.js                    # Express app setup
├── server.js                 # Server entry point
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB ODM for schema-based data modeling.
- **JWT (Json Web Token)**: Token-based authentication.
- **Bcrypt.js**: Library for hashing passwords.
- **Nodemon**: Tool for automatically restarting the server during development.

## Installation

### Prerequisites
- **Node.js** installed on your machine.
- **MongoDB** installed locally or using a cloud-based solution like MongoDB Atlas.

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/course-management-backend.git
   cd course-management-backend
   ```

2. **Install dependencies**
   Install the necessary packages by running:
   ```bash
   npm install
   ```

3. **Set up the environment variables**
   Create a `.env` file in the root directory and provide the necessary environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/course_management_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT signing and verification.
   - `PORT`: Port number on which the server will run (default: 5000).

4. **Run the development server**
   Use the following command to start the server in development mode using **nodemon**:
   ```bash
   npm run dev
   ```

   The server will be running on `http://localhost:5000/`.

## Environment Variables

Make sure to configure the following variables in your `.env` file:

- `MONGO_URI`: MongoDB connection URI (e.g., `mongodb://localhost:27017/course_management_db`).
- `JWT_SECRET`: Secret key used for signing JWT tokens.
- `PORT`: The port on which the server will run (default: 5000).

## Running the Application

To start the application, run:

```bash
npm run dev
```

This will start the server using `nodemon`, which automatically restarts the server when file changes are detected.

If you prefer to start the server without `nodemon`, you can run:

```bash
npm start
```

The server will run on the port specified in the `.env` file (default: 5000).

## API Endpoints

### 1. Authentication

- **Register User**
  - **Endpoint**: `POST /api/auth/register`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**: JWT token for the user.

- **Login User**
  - **Endpoint**: `POST /api/auth/login`
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**: JWT token for the user.

### 2. Course Management (Admin Only)

- **Create Course**
  - **Endpoint**: `POST /api/courses/create`
  - **Description**: Admin can create a new course.
  - **Request Body**:
    ```json
    {
      "title": "JavaScript Basics",
      "description": "Learn the basics of JavaScript",
      "lessons": ["Introduction", "Variables", "Functions"]
    }
    ```
  - **Response**: Details of the created course.

### 3. User Enrollment

- **Enroll in Course**
  - **Endpoint**: `POST /api/courses/enroll`
  - **Description**: Enroll a user in a course.
  - **Request Body**:
    ```json
    {
      "courseId": "60b730bc2a40b6c19c752fd3"
    }
    ```
  - **Response**: Enrollment details.

- **Track Progress**
  - **Endpoint**: `POST /api/courses/track`
  - **Description**: Update progress for an enrolled course.
  - **Request Body**:
    ```json
    {
      "courseId": "60b730bc2a40b6c19c752fd3",
      "progress": 50
    }
    ```
  - **Response**: Updated enrollment with new progress.

## Error Handling

The API uses `try...catch` blocks to handle errors in every asynchronous controller function. Common error scenarios like duplicate user registration, invalid credentials, and missing JWT tokens are handled gracefully. Each API responds with appropriate HTTP status codes and error messages.

### Global Error Handler
An optional global error handler is set up in `app.js` to catch any unhandled errors. This ensures that even if an unexpected error occurs, the server responds with a 500 status code and an error message:

```js
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

## Conclusion

This course management backend provides essential functionality for managing user authentication, course creation (admin-only), user enrollment, and progress tracking. The project is structured using the MVC pattern to keep the code organized and scalable. By following the instructions in this README, you should be able to set up the project locally and run the API with proper error handling and JWT-based protection.
