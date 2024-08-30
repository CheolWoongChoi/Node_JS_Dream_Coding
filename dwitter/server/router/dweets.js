import express from "express";
import { body } from "express-validator";
import { dweetsController } from "../controller/dweet.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateDweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("글자는 3글자 이상이어야 합니다."),
  validate,
];

router.get("/", dweetsController.getDweets);
router.get("/:id", dweetsController.getDweet);
router.post("/", validateDweet, dweetsController.createDweet);
router.put("/:id", validateDweet, dweetsController.updateDweet);
router.delete("/:id", dweetsController.deleteDweet);

export default router;
