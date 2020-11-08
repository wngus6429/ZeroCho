import path from "path";
//노드 경로 조작

module.exports = {
  name: "wordrelay-setting",
  mode: "development", //실서비스:production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  }, //입력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  }, //출력 , 경로를 알아서 합쳐줌, __dirname:현재폴더
};

//이상태에서 밑에 webpack 치면 되는것임
//app: ["./client.jsx", "./WordRelay.jsx"], client.jsx안에서 wordRelay불러오고 있음
// resolve: {extensions: [".js", ".jsx"],}  확장자들 입력 귀찮아서 이렇게함
//npm install -D webpack webpack-cli
