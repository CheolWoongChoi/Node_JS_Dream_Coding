import express from "express";
import { body } from "express-validator";
import { dweetsController } from "../controller/dweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateDweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("글자는 3글자 이상이어야 합니다."),
  validate,
];

// router.get("/", isAuth, dweetsController.getDweets);
router.get("/:id", isAuth, dweetsController.getDweet);
router.post("/", isAuth, validateDweet, dweetsController.createDweet);
router.put("/:id", isAuth, validateDweet, dweetsController.updateDweet);
router.delete("/:id", isAuth, dweetsController.deleteDweet);

export default router;
