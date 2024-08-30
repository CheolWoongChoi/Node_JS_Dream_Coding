import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const data = {
  users: [],
  secret: ")@H£RH(g4a.MamqixST0j7^c1]SyM,y&",
};

export const authController = {
  signup: (req, res, next) => {
    const { username, password, name, email, url } = req.body;

    const payload = {
      username,
      password,
      name,
      email,
      url,
    };

    const token = jwt.sign(
      {
        username,
        name,
      },
      data.secret
    );

    const user = {
      ...payload,
      password: bcrypt.hashSync(payload.password, 10),
      token,
    };

    data.users.push(user);

    res.status(200).json({
      username: user.username,
      token: user.token,
    });
  },
  login: (req, res, next) => {
    const { username, password } = req.body;
    const user = data.users.find((u) => u.username === username);

    // 유저존재안함
    if (!user) {
      res.status(404).json({
        message: "유저가 존재하지 않습니다",
      });
      return;
    }

    // 정보불일치
    if (
      user.username !== username ||
      !bcrypt.compareSync(password, user.password)
    ) {
      res.status(400).json({
        message: "닉네임 또는 비밀번호가 일치하지 않습니다",
      });
      return;
    }

    // 성공
    res.status(200).json({
      token: user.token,
      username: user.username,
    });
  },
  me: (req, res, next) => {
    const token = req.headers.authorization;
    const user = data.users.find((u) => u.token === token);

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
