import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Fix for ES modules pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve the src folder
app.use("/src", express.static(path.join(__dirname, "src")));

// Default route → load the game
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Road Builder running at http://localhost:${port}`);
});
