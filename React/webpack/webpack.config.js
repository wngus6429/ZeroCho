const path = require("path"); //걍 외워
//노드에서 경로 쉽게 조작하도록 하는 기능

module.exports = {
  name: "park-wordrelay", //웹팩설정에 대한 이름 설정인데 마음대로 가능
  mode: "development", //실서비스에서는 production
  devtool: "eval", //빠르게 하겠다는거
  resolve: {
    extensions: [".js", ".jsx"], //알아서 웹팩이 확장자 찾음 밑에 entry에서 확장자 꼭 붙일 필요 없음.
  },
  entry: {
    app: ["./client"],
  }, //입력, 확장자도 안 넣어도됨
  //app: ["./client.jsx", "./WordRelay.jsx"], //사실 이게 맞는데 웹팩이 알아서 판단함
  //client.jsx안에 wordRelay파일을 불러오는게 보이거든, 물론 위에 react, reactDom도 같이 불러옴

  //entry파일들을 module 적용해서 output으로 뺀다
  module: {
    rules: [
      {
        test: /\.jsx?/, //js파일이랑 jsx을 이 룰을 적용하겠다
        loader: "babel-loader", //js랑jsx파일에 바벨을 적용해서 최신아니 실험적 문법을 옛날문법으로 바꿔주겟다.
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        }, //바벨옵션, 이러면 js, jsx을 바벨 적용 해줄거임
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js", // 원하는 파일이름
  }, //출력 , path.join 경로를 알아서 합쳐줌 , __dirname은 현재폴더
  //컴퓨터 마다 C드라이버안에 어디어디 졸라 복잡하니 간단해결
};

//en
