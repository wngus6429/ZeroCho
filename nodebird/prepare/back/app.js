const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

//프론트에서 온 정보를 req.body안에 넣어주는 역할을 이 두줄이 한다
app.use(express.json()); //프론트에서 온 json형식 데이터를 req.body안에 넣음
app.use(express.urlencoded({ extended: true }));
//form submit을 했을때 url인코딩 방식으로 데이터가 오는데.form 데이터를 req.body에 연결

app.get("/", (req, res) => {
  res.send("hello express 익스프레스");
});

app.get("/api", (req, res) => {
  res.send("api 창이다");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hell id2" },
    { id: 3, content: "hell id3" },
  ]);
});

app.use("/post", postRouter); //앞에 "/post"를 붙임으로 인해서
//routes폴더 post.js안에 있는 라우터들 앞에 자동으로 /post가 붙음
//중복제거 , 앞에 post붙이는걸 프리픽스라고 한다

app.use("/user", userRouter);

app.listen(1211, () => {
  console.log("서버 실행 중~!!");
});

//브라우저 주소창에 치는건 get 요청임
//post, delete를 보내려면 프론트처럼, axios 같은거롤 자바스크립트로 post요청을 보내거나
//postman같은 툴이 필요하다 postman으로 post, put, patch같은거 다 사용가능
