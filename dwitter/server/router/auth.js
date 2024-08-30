import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { authController } from "../controller/auth.js";

const router = express.Router();

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("이름은 4글자 이상!"),
  body("password").isLength({ min: 4 }).withMessage("비밀번호는 4자리 이상!"),
  validate,
];

router.post("/signup", validateUser, authController.signup);
router.post("/login", validateUser, authController.login);
router.get("/me", authController.me);

export default router;
