# Content Management System API

A robust RESTful API built with Node.js and Express.js for managing content artifacts with real-time chat functionality, user authentication, and media management.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control (ADMIN, EDITOR, USER)
- 📝 **Artifact Management**: Create, read, update, and manage content artifacts with different statuses (DRAFT, PUBLISHED, ARCHIVED)
- 💬 **Real-time Chat**: Socket.io powered real-time messaging with thread support
- ❤️ **Like System**: Like/unlike functionality for artifacts
- 📁 **Media Upload**: Cloudinary integration for media storage and management
- 🔒 **Rate Limiting**: API rate limiting to prevent abuse
- 🔄 **Webhooks**: Webhook support for external integrations
- ⏰ **Cron Jobs**: Automated scheduled tasks
- 🔑 **OTP System**: One-time password functionality for secure operations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt for password hashing
- **Real-time**: Socket.io
- **File Upload**: Multer + Cloudinary
- **Security**: Cookie-parser, CORS, Express Rate Limit
- **Logging**: Morgan
- **Task Scheduling**: Node-cron

## Project Structure

```
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── package.json                    # Project dependencies
├── config/                         # Configuration files
│   ├── cloudinary.js              # Cloudinary setup
│   └── db.js                      # Database connection
├── controllers/                    # Request handlers
│   ├── artifact.controller.js
│   ├── auth.controller.js
│   ├── chat.controller.js
│   └── likes.controller.js
├── middleware/                     # Custom middleware
│   ├── auth.middleware.js         # Authentication
│   ├── rateLimiter.middleware.js  # Rate limiting
│   ├── role.middleware.js         # Role-based access control
│   └── uploads.middleware.js      # File upload handling
├── models/                         # Database models
│   ├── artifact.js                # Content artifact schema
│   ├── chat.js                    # Chat message schema
│   ├── like.js                    # Like schema
│   ├── otp.js                     # OTP schema
│   ├── thread.js                  # Chat thread schema
│   └── users.js                   # User schema
├── routes/                         # API routes
│   ├── artifacts.route.js
│   ├── auth.route.js
│   └── chats.route.js
├── services/                       # Business logic layer
│   ├── artifact.service.js
│   ├── auth.service.js
│   ├── chat.service.js
│   └── like.service.js
├── socket/                         # Socket.io handlers
│   └── socket.js
├── cron/                          # Scheduled tasks
│   └── testing.js
├── webhook/                        # Webhook handlers
│   └── webhook.js
├── utils/                          # Utility functions
│   └── generateOtp.js
└── uploads/                        # Local upload directory
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account (for media storage)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd content-management-system-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Other configurations as needed
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup/initiate` - Register a new user
- `POST /auth/signup/verify` - Verify User
- `POST /auth/login` - User login

### Artifacts
- `POST /artifacts` - Create a new artifact (ADMIN, EDITOR only)
- `GET /artifacts` - Get all artifacts
- `POST /artifacts/:id/like` - Toggle like on an artifact
- `GET /artifacts/:id/likes` - Get likes for an artifact

### Chat
- `GET /chat/threads` - Get all threads
- `GET /chat/:threadId` - Get Particular thread
- `POST /chat` - Send a chat message

### Webhooks
- `POST /webhooks/*` - Webhook endpoints

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:

**Header:**
```
Authorization: Bearer <your_jwt_token>
```

**Cookie:**
```
token=<your_jwt_token>
```

## Role-Based Access Control

The system supports three user roles:
- **ADMIN**: Full access to all resources
- **EDITOR**: Can create and manage artifacts
- **USER**: Basic read access and interaction features

## Real-time Features

The application uses Socket.io for real-time communication. Connect to the socket server at the same host and port as the API.

**Socket Events:**
- Connect to the socket server for real-time chat updates
- Socket handlers are registered in [socket/socket.js](socket/socket.js)

## Rate Limiting

API endpoints are protected with rate limiting to prevent abuse. The rate limiter is configured in [middleware/rateLimiter.middleware.js](middleware/rateLimiter.middleware.js).

## File Uploads

Media files are uploaded to Cloudinary. Supported operations:
- Single file upload via `/artifacts` endpoint
- Files are processed through Multer middleware
- Cloudinary handles storage and CDN delivery

## Cron Jobs

Automated tasks are scheduled using node-cron. Job definitions can be found in [cron/testing.js](cron/testing.js).

## Development

### Running in Development Mode

For development with auto-reload, you can use nodemon:
```bash
npm install -g nodemon
nodemon server.js
```

### Testing

```bash
npm test
```

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for cross-origin requests
- Rate limiting to prevent abuse
- Cookie parser for secure cookie handling
- Input validation and sanitization recommended

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Author

Your Name

---

**Note**: Make sure to configure all environment variables before running the application. Never commit sensitive information like API keys or secrets to version control.
