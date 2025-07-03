const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const extractBearerToken = require('bearer-token');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // User must provide this in their .env

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

/**
 * @swagger
 * tags:
 *   name: Article
 *   description: Article generation endpoints
 */

// PUBLIC_INTERFACE
exports.generateArticle = async (req, res) => {
  /**
   * Generates an article based on the provided topic and word count.
   * Expects: { topic: string, wordCount: integer }
   * Requires Authorization: Bearer <token>
   * Returns: 200 with { title, body, topic, wordCount }, or error message.
   */

  try {
    // Validate Authorization header (Supabase JWT)
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({ message: "Missing or invalid Authorization header (Bearer token required)." });
    }
    // Validate token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token.", error: error?.message });
    }

    // Validate request body
    const { topic, wordCount } = req.body;
    if (!topic || typeof topic !== 'string' || topic.length < 3) {
      return res.status(400).json({ message: "Invalid or missing 'topic' (minimum 3 characters required)." });
    }
    const maxWordCount = 1200, minWordCount = 100;
    if (!wordCount || typeof wordCount !== 'number' || wordCount < minWordCount || wordCount > maxWordCount) {
      return res.status(400).json({ message: `Invalid wordCount (must be between ${minWordCount} and ${maxWordCount}).` });
    }

    // Compose prompt for OpenAI
    const systemPrompt = `You are a professional human writer. Write a well-structured, original, 100% humanized article on the following topic. Craft with natural flow, clear introduction, body, and conclusion. Avoid repeating content. Keep the article to ${wordCount} words.`;
    const userPrompt = `Topic: "${topic}"\nGenerate an article of about ${wordCount} words.`;

    // Call OpenAI API (gpt-3.5-turbo)
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: wordCount * 2 // Rough buffer, not strict!
    });

    const aiText = completion.choices?.[0]?.message?.content;
    if (!aiText || typeof aiText !== "string") {
      return res.status(502).json({ message: "OpenAI did not return an article. Please try again." });
    }

    // Basic formatting - split first heading if exists
    // Optional: Extract title (on first line preceding \n) and body
    let [title, ...bodyLines] = aiText.trim().split('\n');
    title = title.replace(/^#+\s*/, '').trim();
    let body = bodyLines.join('\n').trim();
    if (body.length < 10) {
      // fallback: treat all as body
      title = topic;
      body = aiText.trim();
    }

    // Success response
    res.status(200).json({
      topic,
      wordCount,
      title,
      body
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error("Article generation error: ", err);
    }
    res.status(500).json({
      message: "Failed to generate article.",
      error: err.message || String(err)
    });
  }
};
