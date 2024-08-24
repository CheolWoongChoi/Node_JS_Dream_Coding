const fs = require("fs");
const http = require("http");
const ejs = require("ejs");

const name = "Cheols";
const courses = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
  {
    name: "JS",
  },
  {
    name: "Node",
  },
];

const server = http.createServer((req, res) => {
  console.log("incoming...");

  const url = req.url;
  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    ejs
      .renderFile("./template/root.ejs", { name })
      .then((data) => res.end(data));
  } else if (url === "/courses") {
    ejs
      .renderFile("./template/courses.ejs", { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile("./template/not-found.ejs", { name })
      .then((data) => res.end(data));
  }
});

server.listen(8080);
