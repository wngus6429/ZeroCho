const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path"); //노드가 절대경로 도와줌
//노드에서는 import from 안쓰고 require랑 module.exports 사용
module.exports = {
  mode: "development",
  devtool: "eval", //개발용, 속도가 빠름
  entry: {
    app: path.join(__dirname, "main.js"),
    //나중에 app.js로 하나로 합쳐짐
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    //어떻게 합칠건지, 어떤게 처리할건지
    //JS 아닌놈 처리를 rules가 함
    rules: [
      {
        test: /\.vue$/,
        //.vue로 끝나는 파일은 vue-loader가 담당한다.
        use: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  //밑에 output나오기전에 plugins에 있는것들이 가공해준다
  output: {
    filename: "[name].js", //app.js
    path: path.join(__dirname, "dist"), //dirname = 디렉토리이름
    //이렇게 하면 알아서 경로를 합쳐줌, 2번째줄,
    //path: "./dist", //dist안에 app.js가 최종결과로 나옴 나중에
    //<script src="/dist/app.js"></script>
  },
};

//웹팩은 스크립트가 많을때 합치기 위해서 사용한다.
