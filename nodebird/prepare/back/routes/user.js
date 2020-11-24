const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

//post/user/
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    } //리턴 안 붙이면 밑에꺼 까지 실행됨
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok"); //200성공, 201은 의미를 둬서 생성된
  } catch (error) {
    console.error(error);
    next(error); //next로 에러보내면 편해진다, status(500)
  }
});

module.exports = router;
