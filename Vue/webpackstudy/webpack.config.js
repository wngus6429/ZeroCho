const VueloaderPlugin = require("vue-loader/lib/plugin");
const path = require("path"); //노드가 절대경로 도와줌

module.exports = {
  entry: {
    app: path.join(__dirname, "main.js"),
    //나중에 app.js로 하나로 합쳐짐
  },
  module: {
    //어떻게 합칠건지, 어떤게 처리할건지
    //JS 아닌놈 처리를 rules가 함
    rules: [
      {
        test: /\.vue$/, //.vue로 끝나는 파일
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueloaderPlugin()],
  output: {
    filename: "[name].js", //app.js
    path: path.join(__dirname, "dist"), //dirname = 디렉토리이름
    //이렇게 하면 알아서 경로를 합쳐줌, 2번째줄,
    //path: "./dist", //dist안에 app.js가 최종결과로 나옴 나중에
    //<script src="/dist/app.js"></script>
  },
};

//웹팩은 스크립트가 많을때 합치기 위해서 사용한다.
