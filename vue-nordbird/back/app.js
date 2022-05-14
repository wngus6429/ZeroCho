const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models'); //model폴더 index.js의 db를 불러온거
const app = express();

db.sequelize.sync(); // 이게 있어야 DB 시작된다.

app.use(cors('http://localhost:5000/'));
// app.use는 req,res를 조작한다. 익스프레스 미들웨어,
// app.get, app.post도 사실 미들웨어임.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// form을 통해서 전송할때 그 데이터를 해석해서 req.body에 넣어준다.
// 이런걸 잘 알아야함.

// 앞에 localhost:3000 숨겨짐
app.get('/', (req, res) => {
  res.send('안녕 백엔드 님');
  // res.status(200).send('안녕백엔드')
});

app.post('/user', async (req, res, next) => {
  // await async는 trycatch로 감싸주자
  try {
    console.log('req', req);
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).json(newUser); //json으로 변환 응답
    // 200성공, 201은 성공적으로 생성됨.
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.listen(3000, () => {
  console.log(`백엔드서버${3000}번 포트에서 작동중`);
});
