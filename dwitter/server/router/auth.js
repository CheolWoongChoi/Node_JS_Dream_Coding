import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { authController } from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("username은 4글자 이상!"),
  body("password").trim().isLength({ min: 4 }),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("이름을 입력하세요"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식이 올바르지 않아요"),
  body("url")
    .isURL()
    .withMessage("URL이 올바르지 않아요")
    .optional({ values: "falsy" }),
  validate,
];

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateCredential, authController.login);
router.get("/me", authController.me);

export default router;
