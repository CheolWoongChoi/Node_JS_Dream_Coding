import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth.js";

/**
 * 보안 코드
 */
const jwtSecretKey = ")@H£RH(g4a.MamqixST0j7^c1]SyM,y&"; // 32
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export const authController = {
  signup: async (req, res, next) => {
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username);

    if (found) {
      return res.status(409).json({ message: `${username}은 이미 존재!` });
    }

    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
      username,
      password: hashed,
      name,
      email,
      url,
    });
    const token = createJwtToken(userId);

    res.status(201).json({
      token,
      username,
    });
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);

    if (!user) {
      return res.status(401).json({
        message: "유저 또는 비밀번호가 불일치!",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "유저 또는 비밀번호가 불일치!",
      });
    }

    const token = createJwtToken(user.id);
    res.status(200).json({
      token,
      username,
    });
  },
  me: (req, res, next) => {
    const token = req.headers.authorization;

    if (!user) {
      res.status(404).json({
        message: "내 정보가 없습니다.",
      });
      return;
    }

    res.status(200).json({
      token: user.token,
      username: user.username,
    });
  },
};

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
