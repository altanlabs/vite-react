import { serve } from "bun";
import { exec, spawnSync } from "bun:process";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/reload" && req.method === "POST") {
      console.log("Pulling latest changes from GitHub...");
      spawnSync("git", ["pull"]);
      console.log("Installing dependencies...");
      spawnSync("bun", ["install"]);
      console.log("Reload complete!");
      return new Response("Reloaded successfully", { status: 200 });
    }

    // Serve files from the dist folder
    let filePath = resolve(`./dist${url.pathname}`);
    if (url.pathname === "/") {
      filePath = resolve("./dist/index.html");
    } else if (!existsSync(filePath)) {
      filePath = resolve("./dist/index.html");
    }

    if (existsSync(filePath)) {
      const content = readFileSync(filePath);
      const contentType = getContentType(filePath);
      return new Response(content, { headers: { "Content-Type": contentType } });
    }

    return new Response("File not found", { status: 404 });
  },
});

console.log(`Server is running on Vercel!`);

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
