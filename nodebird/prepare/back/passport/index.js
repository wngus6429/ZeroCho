const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //! 첫번쨰에 user 인자에 return req.login(user, async 쪽 데이터가 들어감
    done(null, user.id); //! 첫번째가 서버에러, 두번쨰가 성공
    //! 쿠키랑 유저 아이디만 서버에서 들고 있고,
  });
  passport.deserializeUser(async (id, done) => {
    //! 로그인 성공 후 그 다음 요청부터 항상 매번 실행됨, 사용자 정보 복구
    //! 이 부분은 라우터 실행되기 전에 항상 움직이는거임. 인증
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); //! req.user를 만든다.
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
