const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

//! Get /user, 이 요청은 브라우저 새로고침 할때마다 보냄, 로그인 유지
router.get('/', async (req, res, next) => {
  console.log(req.headers); // 여기안에 쿠키가 들어있음
  try {
    if (req.user) {
      // 로그인 안 했는데 매번 새로고침시 작동하면 where요쪽 에러
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        }, // 원하는 정보만 받기, 비밀번호만 안 받고  싶음
        include: [
          { model: Post, attributes: ['id'] },
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] },
        ],
      });
      res.status(200).json(fullUserWithoutPassword); // 사용자가 있으면 보내주고
    } else {
      res.status(200).json(null); // 사용자가 없으면 안 보내줌
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// attributes: ['id']는 아이디만 가져오게끔. 팔로잉, 팔로워 숫자만 알면 되는데
// 데이터 다 가져오면 렉 + 데이터 사용량 증가
// 서버에서 프론트로 필요한 데이터만 보내주는거임

//! Profile.js 참조 GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    // 나 먼저 찾고
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followers = await user.getFollowers({ limit: parseInt(req.query.limit, 10) });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//! Profile.js 참조
router.get('/followings', isLoggedIn, async (req, res, next) => {
  //  GET /user/followings
  try {
    //! 나 먼저 찾고
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followings = await user.getFollowings({ limit: parseInt(req.query.limit, 10) });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 특정한 유저 검색 Get /user/1
router.get('/:userId', async (req, res, next) => {
  try {
    // 로그인 안 했는데 매번 새로고침시 작동하면 where요쪽 에러
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      }, // 원하는 정보만 받기, 비밀번호만 안 받고  싶음
      include: [
        { model: Post, attributes: ['id'] },
        { model: User, as: 'Followings', attributes: ['id'] },
        { model: User, as: 'Followers', attributes: ['id'] },
      ],
    });
    if (fullUserWithoutPassword) {
      //! 시퀄라이즈에서 온 데이터는 toJson()으로 json으로 바꿔야함
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; //! id가 보이면 안되니까. 단순 length만 넘겨준다.
      data.Followings = data.Followings.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      res.status(200).json(data); // 사용자가 있으면 보내주고
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.'); // 사용자가 없으면 안 보내줌
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 특정 유저의 글 검색
// GET /user/1/posts
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId }; // 초기로딩 ㅋㅋ 쿼리스트링 5분
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때 // 스크롤 내려서 더 불러오는 상황
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // 보다 작은
    } //  21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 // lastId가 12면 12보다 작은거 부름
    // id가 라스트아이디보다 작은걸로 10개를 불러와라 // Op는 operator
    const posts = await Post.findAll({
      where,
      limit: 10, // 10개만 가져와라
      order: [['createdAt', 'DESC']], // 처음에는 게시글 생성일 내림차순으로 정렬한다음
      include: [
        // 작성자 비밀번호 보이면 안되니
        { model: User, attributes: ['id', 'nickname'] },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'], // 작성자 비밀번호 보이면 안되니
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        // 좋아요 누른사람
        { model: User, as: 'Likers', attributes: ['id'] },
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
      ],
    });
    // console.log('get 게시물', posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 로그인 기능, 포스트 // POST // post/user/login
// 이게 미들웨어 확장이라고 한다.
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err); // 서버쪽 에러의 경우
      return next(err);
    }
    if (info) {
      //  info클라이언트 에러 //! 401 허가되지 않음. 403 금지, http 상태코드검색
      return res.status(401).send(info.reason);
    }
    //! 이게 진짜 로그인 하는거, 밑에꺼 실행되면 passport/index로 감
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        // 혹시나 패스포트 에러가 날까 싶어서, 한번도 본적 없다함
        console.error(loginErr);
        return next(loginErr);
      }
      //! 위 코드와 passport에서 한번 불러왓는데. 왜 또 불럿냐면
      //! 밑에서 추가적으로 더 할수 있음.
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        }, // 원하는 정보만 받기, 비밀번호만 안 받고  싶음
        include: [
          //! models/user.js 에서 받아옴
          { model: Post, attributes: ['id'] }, // 내가쓴 게시글
          { model: User, as: 'Followings', attributes: ['id'] }, // 팔로잉 한거
          { model: User, as: 'Followers', attributes: ['id'] }, // 팔로워 한거
        ],
      });
      // res.setHeader('Cookie', '문자열') // 이런식이다.
      return res.status(200).json(fullUserWithoutPassword);
      // case LOG_IN_SUCCES 의 action.data로 간다.
      // 사용자 정보를 프론트로 넘겨줌
    });
  })(req, res, next);
}); // local 뒤의 부분은 passport폴더 local의 done 내용이 온거

//! 회원가입 기능 post/user/
router.post('/', isNotLoggedIn, async (req, res, next) => {
  console.log('회원가입');
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    } // 리턴 안 붙이면 밑에꺼 까지 실행됨
    console.log('로그인쪽', req); //  비크립트도 await 처리 해줘야함
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // ! create는 테이블에 데이터를 넣는거임
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok'); // 200성공, 201은 의미를 둬서 생성된
  } catch (error) {
    console.error(error);
    next(error); // next로 에러보내면 편해진다, status(500)
  }
});

//! 로그아웃
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

//! 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({ nickname: req.body.nickname }, { where: { id: req.user.id } });
    res.status(200).json({ nickname: req.body.nickname }); // 여긴 바뀐닉네임 ㅋ
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  //  PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 팔로우하려고 하시네요?');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  //  DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 언팔로우하려고 하시네요?');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! 팔로워 삭제 DELETE /user/follower/2
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 사람을 차단하려고 하시네요?');
    } // 상대방이 나를 언팔로 하는거랑 내가 끊는거랑 같음
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

//  router.get('/:userId/posts', async (req, res, next) => {
//    try {
//      const where = { UserId: req.params.userId }; // 초기로딩 ㅋㅋ 쿼리스트링 5분
//      if (parseInt(req.query.lastId, 10)) {
//        // 초기 로딩이 아닐 때 // 스크롤 내려서 더 불러오는 상황
//        where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // 보다 작은
//      } //  21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 // lastId가 12면 12보다 작은거 부름
//      // id가 라스트아이디보다 작은걸로 10개를 불러와라 // Op는 operator
//      const posts = await Post.findAll({
//        where,
//        limit: 10, // 10개만 가져와라
//        order: [
//          ['createdAt', 'DESC'], // 처음에는 게시글 생성일 내림차순으로 정렬한다음
//          //   [Comment, 'createdAt', 'DESC'], // 댓글들의 생성일을 내림차순
//        ],
//        include: [
//          {
//            model: User, // 작성자정보
//            attributes: ['id', 'nickname'], // 작성자 비밀번호 보이면 안되니
//          },
//          { model: Image },
//          {
//            model: Comment,
//            include: [
//              {
//                model: User,
//                attributes: ['id', 'nickname'], // 작성자 비밀번호 보이면 안되니
//              },
//            ],
//          },
//          {
//            model: User, // 좋아요 누른사람
//            as: 'Likers',
//            attributes: ['id'],
//          },
//          {
//            model: Post,
//            as: 'Retweet',
//            include: [
//              {
//                model: User,
//                attributes: ['id', 'nickname'],
//              },
//              {
//                model: Image,
//              },
//            ],
//          },
//        ],
//      });
//      // console.log('get 게시물', posts);
//      res.status(200).json(posts);
//    } catch (error) {
//      console.error(error);
//      next(error);
//    }
//  });
