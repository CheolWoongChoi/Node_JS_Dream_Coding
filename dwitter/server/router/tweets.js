import express from "express";
import { body } from "express-validator";
import { tweetController } from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("글자는 3글자 이상이어야 합니다."),
  validate,
];

/** 
 * 
express-openapi-validator와 openapi.yml로 getTweets 대체

router.get("/", isAuth, tweetController.getTweets);
*
**/

router.get("/:id", isAuth, tweetController.getTweet);
router.post("/", isAuth, validateTweet, tweetController.createTweet);
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
