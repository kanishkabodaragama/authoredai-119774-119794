# Backend AI Service

The backend for the **AI Article Writing Tool** provides all API logic—user management, authentication, article generation (OpenAI Integration), and handles all communication with 3rd-party services (Supabase, OpenAI).

---

## Project Features

- **REST API Endpoints**:  
  - `/api/auth/register` – User registration  
  - `/api/auth/login` – User login (returns JWT)  
  - `/api/article/generate` – Generate an AI-written article (requires auth)
- **Authentication**: Uses [Supabase Auth](https://supabase.com/docs/guides/auth) for user management and JWT validation
- **Article Generation**: Uses [OpenAI GPT](https://platform.openai.com/docs/) via OpenAI Python SDK
- **Input Validation**: Checks topic and word count bounds for safety

---

## Setup Guide

### 1. Prerequisites

- Node.js (18+ recommended)
- Access to project `.env` file with Supabase and OpenAI API keys

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend root with:

```
PORT=5001
SUPABASE_URL=https://albbopgnyqrzwvbcejjx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsYmJvcGdueXFyend2YmNlamp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTg5MjEsImV4cCI6MjA2NzA5NDkyMX0.HToAUbDOADMJey4wFqiT6qPweZs9UpVek62n7IQgNA0
OPENAI_API_KEY=sk-...YOUR_OPENAI_KEY...
```

- Do **not** commit `.env` to version control!

### 4. Start Development Server

```bash
npm start
```
Default port: **5001** (change with `PORT` in your `.env`)

---

## Authentication & API Flow

1. **Register** (`POST /api/auth/register`)
    - `{ email, password }`  
    - Creates a new user in Supabase Auth
2. **Login** (`POST /api/auth/login`)
    - `{ email, password }`  
    - Returns JWT token (`access_token`)
3. **Generate Article** (`POST /api/article/generate`)
    - Header: `Authorization: Bearer <token>`  
    - Body: `{ topic, wordCount }`  
    - Calls OpenAI to generate and returns article text

**All protected API endpoints require the JWT token in the Authorization header.  
Supabase Auth is the source of truth for user sessions.**

---

## 3rd Party Integrations

- **Supabase:**  
  [See integration details.](assets/supabase.md)  
  Used for user authentication. Do **not** use the service role key in `.env`; use only the "anon public" key to avoid security issues.

- **OpenAI:**  
  Requires a valid OpenAI API key for article generation.  
  Add your key in the `.env` file as `OPENAI_API_KEY`.

---

## Project Structure

```
backend_ai_service/
├── controllers/      # Business logic for auth (authController.js), article gen (articleController.js)
├── routes/           # Route declarations for all API endpoints
├── middleware/       # Auth middleware (JWT validation via Supabase)
├── server.js         # Main Express app entry point
├── assets/           # Extended docs, e.g. Supabase integration
├── package.json
├── README.md
└── ...
```

---

## Frontend–Backend Communication

- By default, all API endpoints are mounted under `/api/`
- **Development:** Frontend proxies `/api` to backend's localhost port (see frontend docs)
- **Production:** Ensure proper CORS configuration in backend (allow frontend's domain)

**CORS Example:**
```js
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000', // or your production frontend URL
  credentials: true
}))
```

---

## Troubleshooting & Notes

- If requests fail with CORS errors, check Express CORS config and allowed `origin`s.
- For authentication failures, make sure the Supabase keys and project URL are correct in both `.env` and Supabase.
- If OpenAI article generation fails:
    - Check `OPENAI_API_KEY` in your `.env` file
    - Review backend server logs for errors
    - Verify the endpoint `/api/article/generate` is only accessed with a valid JWT
- **Do not commit any credentials or `.env` to Git!**
- Use Node.js 18+ for best compatibility.
- Backend API default port: 5001.

---

## References

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Express.js](https://expressjs.com/)

MIT License
