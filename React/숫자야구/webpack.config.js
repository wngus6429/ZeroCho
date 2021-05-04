const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "park-relay",
  mode: "development",
  devtool: "eval", //배포는 hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client", //위에 resolve로 확장자 생략
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        //targets적은게 앞preset-env의 설정한거임. 브라우저 마지막버전의 2단계 앞까지만 지원
      }, //옛날거로 갈수록 최신문법 지원 해주는게 어려운게 어려우니, 저걸 해주면 바벨의 작업양도 적어지니 빨라짐
    ], // presets애가 플러그인들 모음임 , browserlist 홈페이지 확인하기
  },
  //plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], //확장 프로그램 같은 느낌
  //현업에서 보면 plugins많다. 다 지워서 하나하나 확인해보는게 좋음
  plugins: [new ReactRefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  },
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
