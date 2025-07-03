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

Create a `.env` file for environment-specific configuration. The backend requires the following environment variables for Supabase authentication:

```
SUPABASE_URL=https://albbopgnyqrzwvbcejjx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsYmJvcGdueXFyend2YmNlamp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTg5MjEsImV4cCI6MjA2NzA5NDkyMX0.HToAUbDOADMJey4wFqiT6qPweZs9UpVek62n7IQgNA0
```

## API Endpoints (planned)

- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/article/generate`

## License

MIT
