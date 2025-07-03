const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

// PUBLIC_INTERFACE
exports.register = async (req, res) => {
  /**
   * Registers a new user with the provided email and password.
   * Expects: { email: string, password: string }
   * Returns: 201 with user info (no password), or error message.
   */
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password." });
  }
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).json({
      message: "User registered successfully.",
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.login = async (req, res) => {
  /**
   * Logs in a user with the provided email and password.
   * Expects: { email: string, password: string }
   * Returns: 200 with access token, or 401/400 with error.
   */
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password." });
  }
  try {
    const { session, user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(200).json({
      message: "Login successful.",
      access_token: session.access_token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed.", error: err.message });
  }
};
