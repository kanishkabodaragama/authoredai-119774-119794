require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware example (will load middleware from ./middleware in future)
app.use(express.json());

const fs = require("fs");
const path = require("path");

// Dynamically mount all routes in routes/ folder, including 'article.js'
const routesPath = path.join(__dirname, "routes");
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const route = require(`./routes/${file}`);
      app.use("/api", route);
    }
  });
}

// Default homepage
app.get("/", (req, res) => {
  res.send("AI Article Writing Tool Backend API");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Backend AI service running on port ${PORT}`);
});
