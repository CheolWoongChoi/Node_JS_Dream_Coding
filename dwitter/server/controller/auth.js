import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

export const authController = {
  signup: async (req, res, next) => {
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUsername(username);

    if (found) {
      return res.status(409).json({ message: `${username}은 이미 존재!` });
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
      username,
      password: hashed,
      name,
      email,
      url,
    });
    const token = createJwtToken(userId); // cookie header
    setToken(res, token);

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
    setToken(res, token);

    res.status(200).json({
      token,
      username,
    });
  },
  me: async (req, res, next) => {
    const user = await userRepository.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      // token: req.token,
      username: user.username,
    });
  },
};

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options); // HTTP-Only Cookie
}
