const fs = require("fs");
const path = require("path");
const http = require("http");
// const http2 = require('http2'); // https

const server = http.createServer((req, res) => {
  console.log("incoming...");
  const url = req.url;

  // console.log(req.headers);
  // console.log(req.httpVersion);
  // console.log(req.method);
  // console.log(req.url);

  if (url === "/") {
    fs.createReadStream("./html/root.html").pipe(res);
  } else if (url === "/courses") {
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
