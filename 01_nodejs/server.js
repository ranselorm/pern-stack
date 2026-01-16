import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Just built a nodejs server");
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
