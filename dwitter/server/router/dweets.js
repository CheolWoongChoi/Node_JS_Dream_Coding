import express from "express";
import "express-async-errors";

const router = express.Router();

let dweets = [
  {
    id: "1",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png",
  },
  {
    id: "2",
    text: "Hello, Cup!",
    createdAt: "2024-08-27T04:00:00.000Z",
    name: "Cap",
    username: "cap",
    url: "https://img.freepik.com/free-psd/expressive-woman-gesturing_23-2150198673.jpg",
  },
];

// GET /dweets
// GET /dweets?username=:username
router.get("/", (req, res) => {
  const username = req.query.username;

  const data = username
    ? dweets.filter((d) => d.username === username)
    : dweets;

  res.status(200).json(data);
});

// GET /dweets/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const dweet = dweets.find((d) => d.id === id);

  console.log(id, dweet);

  if (dweet) {
    res.status(200).json(dweet);
  } else {
    res.status(404).json({
      message: `Dweet id(${id}) not found`,
    });
  }
});

// POST /dweets
router.post("/", (req, res) => {
  const { text, username, name } = req.body;

  const dweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  dweets = [dweet, ...dweets];

  res.status(201).json(dweet);
});

// PUT /dweets/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const dweet = dweets.find((d) => d.id === id);

  if (dweet) {
    dweet.text = text;

    res.status(200).json(dweet);
  } else {
    res.status(404).json({
      message: `Dweet id(${id}) not found`,
    });
  }
});

// DELETE /dweets/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  dweets = dweets.filter((d) => d.id !== id);

  res.sendStatus(204);
});

export default router;
