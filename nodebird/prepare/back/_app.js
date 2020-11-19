const http = require("http"); //npm에서 설치 안해도 노드가 모듈 제공
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.write("<h1>Hello Park</h1>"); //write로 다수 적기 가능
  res.write("<h2>Hello Ju</h2>");
  res.write("Hello Hyun");
  res.end("Hello node"); //end는 마지막에만 씀
});
server.listen(3065, () => {
  console.log("서버 실행 중");
});

//app.js를 실행하면 노드 런타임이 코드를 실행해서 http가 서버역할을 해줌
//노드는 서버가 아님, 노드가 제공하는 http 모듈임
