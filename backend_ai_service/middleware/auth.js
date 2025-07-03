const { createClient } = require('@supabase/supabase-js');

/**
 * Authentication middleware to validate Supabase JWT access token.
 * Checks Authorization: Bearer <token> in the request header.
 * If valid, attaches `req.user` with the user info.
 * If not, returns 401 Unauthorized.
 */

// PUBLIC_INTERFACE
async function authMiddleware(req, res, next) {
  /** 
   * Authentication middleware for validating Supabase Auth JWT tokens.
   * Expects header: Authorization: Bearer <token>
   * On success: attaches user info to req.user and calls next()
   * On failure: returns 401 with message
   */
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return res.status(500).json({ message: "Supabase credentials not configured." });
    }
    // Extract Bearer token from Authorization header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Missing or invalid Authorization header. Expected 'Bearer <token>'." });
    }
    const token = authHeader.split(' ')[1].trim();
    if (!token) {
      return res.status(401).json({ message: "Missing access token." });
    }

    // Validate JWT with Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token.", error: error?.message });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(500).json({
      message: "Authentication verification failed.",
      error: err.message || String(err),
    });
  }
}

module.exports = authMiddleware;
