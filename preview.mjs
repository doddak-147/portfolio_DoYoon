import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer((request, response) => {
  const requestPath = request.url === "/" ? "/index.html" : request.url;
  const filePath = join(process.cwd(), requestPath.split("?")[0]);
  const stream = createReadStream(filePath);
  stream.on("open", () => {
    response.writeHead(200, { "content-type": mime[extname(filePath)] ?? "application/octet-stream" });
    stream.pipe(response);
  });
  stream.on("error", () => {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  });
}).listen(4173, "127.0.0.1", () => {
  console.log("Local: http://127.0.0.1:4173");
});
