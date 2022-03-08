const express = require("express");

const app = express();

// 앞에 localhost:3000 숨겨짐
app.get("/", (req, res) => {
  res.send("안녕 백엔드 주현님");
  //   res.status(200).send('안녕백엔드')
});

app.listen(3000, () => {
  console.log(`백엔드서버${3000}번 포트에서 작동중`);
});
