import express from "express";
const app = express();

app.get("/", (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  res.send("hi!");
});

app.get("/sky/:id", (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  console.log(req.query.keyword);

  res.setHeader("key", "value");
  res.status(201).send("created");
});

app.listen(8080);
