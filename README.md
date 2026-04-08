# Communique Project

This repository contains two main components:

- **RAVEZ-API-main**: The backend RESTful API server
- **RAVEZ-SPA-main**: The frontend Single Page Application (SPA)

---

## RAVEZ-API-main (Backend API)

### Overview
This is a Node.js/Express-based REST API that provides endpoints for user authentication, thread posting, comments, likes, follows, notifications, hashtags, and more. It uses a SQL database for data storage and supports user management, social interactions, and content feeds.

### Key Features
- User registration, login, and profile management
- Thread (post) creation, editing, and deletion
- Commenting, liking, sharing, and reposting threads
- Follow/unfollow users
- Hashtag support for content discovery
- Notification system for user activities
- Password reset and OTP verification

### Structure
- `src/` contains controllers, models, routes, middlewares, and utilities
- `public/` contains static files for API documentation or samples
- `endpoint_api/v2` and `endpoint_api/v3` contain API documentation for different versions
- Database schemas are in `db.sql` and `thread_db.sql`

### How It Works
1. The API exposes endpoints (see `endpoint_api/v2` and `endpoint_api/v3` for docs)
2. Clients (like the SPA) send HTTP requests to these endpoints
3. The API handles authentication, processes requests, interacts with the database, and returns JSON responses

---

## RAVEZ-SPA-main (Frontend SPA)

### Overview
This is a modern JavaScript Single Page Application (SPA) built with Vite. It provides the user interface for interacting with the API, allowing users to sign up, sign in, view and post threads, follow users, manage profiles, and more.

### Key Features
- Responsive UI for all major features (home, profile, search, notifications, etc.)
- User authentication and session management
- Thread posting, commenting, liking, and sharing
- Profile editing and avatar upload
- Password reset and OTP flows
- Real-time updates for notifications and follows

### Structure
- `src/components/` contains reusable UI components
- `src/pages/` contains main page views (home, profile, sign in, etc.)
- `src/core/` contains SPA logic and utilities
- `src/styles/` contains CSS for styling

### How It Works
1. The SPA loads in the browser and interacts with the API via HTTP requests
2. User actions (sign in, post, like, etc.) trigger API calls
3. The SPA updates the UI based on API responses, providing a seamless user experience

---

## Getting Started

1. **Start the API**
   - Navigate to `RAVEZ-API-main` and follow the instructions in its `README.md` to install dependencies and run the server
2. **Start the SPA**
   - Navigate to `RAVEZ-SPA-main` and follow its `README.md` to install dependencies and run the frontend
3. **Usage**
   - Access the SPA in your browser; it will communicate with the API for all backend operations

---

---

## Contributors
Big Thanks to the following contributors who contributed in this project:
1. Vince
2. Wilson
3. Rey Arby
4. Zeldrick 
5. Raecell Ann

---

For more details, see the individual `README.md` files in each subproject.