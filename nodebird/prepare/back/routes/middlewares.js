exports.isLoggedIn = (req, res, next) => {
  console.log('미들웨어, isLoggedIn');
  if (req.isAuthenticated()) {
    next(); //다음 미들웨어로
    // next() 괄호안에 뭐라도 넣으면 에러처리 하러감
  } else {
    res.status(401).send('로그인이 필요합니다');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log('미들웨어, isNotLoggedIn');
  if (!req.isAuthenticated()) {
    next(); //다음 미들웨어로
  } else {
    res.status(401).send('로그인이 필요합니다');
  }
};
