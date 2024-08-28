import express from "express";
import "express-async-errors";
import { dweetsController } from "../controller/dweet.js";

const router = express.Router();

router.get("/", dweetsController.getDweets);
router.get("/:id", dweetsController.getDweet);
router.post("/", dweetsController.createDweet);
router.put("/:id", dweetsController.updateDweet);
router.delete("/:id", dweetsController.deleteDweet);

export default router;
