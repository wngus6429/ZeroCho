const Sequelize = require('sequelize');
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');
const env = process.env.NODE_ENV || 'development';
//! || 기본값 연산자로 development를 가리키고 있다. 나중에 앞에부분을 production으로 바꾼다
const config = require('../config/config')[env];
//! config.json 안에 있는 development를 가져오는거지
// development: {
//   username: "root",
//   password: null,
//   database: "react-nodebird",
//   host: "127.0.0.1",
//   dialect: "mysql",
// },
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
//! 시퀄라이즈가 노드랑 mysql을 연결해줌, 설정 정보를 던져줌

//! 테이블을 만들어야지???
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;
//이걸로 위에 애들 반복문 돌려야함
Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); //! 이 부분은 각 모델 파일안에 associate를 실행, 연결시켜준다.

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
