# Supabase Integration Documentation

This backend uses [Supabase](https://supabase.com/) for user authentication (registration and login).

## Project Credentials

- `SUPABASE_URL`: https://albbopgnyqrzwvbcejjx.supabase.co
- `SUPABASE_KEY`: See `.env` (ANON PUBLIC KEY)

## Environment Setup

Add the following to your `.env` file:
```
SUPABASE_URL=https://albbopgnyqrzwvbcejjx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsYmJvcGdueXFyend2YmNlamp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTg5MjEsImV4cCI6MjA2NzA5NDkyMX0.HToAUbDOADMJey4wFqiT6qPweZs9UpVek62n7IQgNA0
```

## Usage

The backend controller (`controllers/authController.js`) initializes a Supabase client via:
```js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
```

All authentication endpoints (`/api/auth/register`, `/api/auth/login`) use Supabase Auth to manage users securely. On registration, a user account is created. On login, Supabase issues a session token.

## Security

**Never** commit your service role key or private keys. Only the ANON PUBLIC key should be used in this backend.

## Supabase Dashboard

Go to the Supabase project dashboard to manage users, check authentication logs, or update project settings.

## Reference

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
