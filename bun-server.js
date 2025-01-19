import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Handle GitHub Webhook for /reload endpoint
  if (url.pathname === "/reload" && req.method === "POST") {
    try {
      console.log("Pulling latest changes from GitHub...");
      execSync("git pull");
      console.log("Installing dependencies...");
      execSync("npm install");
      console.log("Reload complete!");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Reloaded successfully");
    } catch (error) {
      console.error("Error reloading:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Failed to reload");
    }
    return;
  }

  // Serve static files from the dist directory
  let filePath = resolve(`./dist${url.pathname}`);
  if (url.pathname === "/") {
    filePath = resolve("./dist/index.html");
  } else if (!existsSync(filePath)) {
    filePath = resolve("./dist/index.html"); // Default to index.html for SPA routing
  }

  if (existsSync(filePath)) {
    const content = readFileSync(filePath);
    const contentType = getContentType(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Helper function to determine content type
function getContentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html";
  if (filePath.endsWith(".js")) return "application/javascript";
  if (filePath.endsWith(".css")) return "text/css";
  if (filePath.endsWith(".json")) return "application/json";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  return "text/plain";
}
