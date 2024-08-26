import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file", (req, res) => {
  console.log("/file");
});

app.get("/file1", (req, res) => {
  console.log("/file1");

  try {
    const data = fs.readFileSync("./file1.txt");
    res.send(data);
  } catch (e) {
    res.sendStatus(404);
  }
});

app.get("/file2", (req, res) => {
  console.log("/file2");

  fsAsync
    .readFile("/file2.txt") //
    .then((data) => res.send(data))
    .catch((error) => res.sendStatus(404));
});

app.get("/file3", async (req, res) => {
  console.log("/file3");

  const data = await fsAsync.readFile("/file2.txt");
  res.send(data);
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: `[ ${req.path} ]` + " Something went wrong",
  });
});

app.listen(8080);
