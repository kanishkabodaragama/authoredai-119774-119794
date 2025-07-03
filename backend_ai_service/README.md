# Backend AI Service

This is the backend component for the **AI Article Writing Tool**.  
It provides RESTful API endpoints for user authentication, article generation, and user management.

## Features

- User login and registration (planned)
- Generate humanized articles with OpenAI API (planned)
- Input validation for topic and word count
- REST API endpoints (`/api/auth/login`, `/api/auth/register`, `/api/article/generate`)

## Setup

1. **Install dependencies**  
   ```
   npm install
   ```

2. **Start the server**  
   ```
   npm start
   ```
   The server runs on port `5001` by default (configurable via `.env`).

3. **Project Structure**
   ```
   backend_ai_service/
   ├── controllers/
   ├── routes/
   ├── middleware/
   ├── server.js
   ├── package.json
   └── README.md
   ```

## Environment Variables

Create a `.env` file for environment-specific configuration (such as API keys).

## API Endpoints (planned)

- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/article/generate`

## License

MIT
