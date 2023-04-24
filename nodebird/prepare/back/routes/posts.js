const express = require('express');
// 리밋과 오프셋 방식
const { Post, User, Image, Comment } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

// Get posts
router.get('/', async (req, res, next) => {
  try {
    const where = {}; // 초기로딩 ㅋㅋ 쿼리스트링 5분
    // lastId 에서 10개 받아오기, 지금 소스상 lastId보다 적은 숫자 10개 불러오기
    if (parseInt(req.query.lastId, 10)) {
      // 뒤에 10은 parseInt임
      //! 초기 로딩이 아닐 때, 더 불러와야 하는 상황, 스크롤 내려서 더 불러오는 상황
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; //! 보다 작은 표현임
    } // lastId가 12면 12보다 작은거 부름
    // id가 라스트아이디보다 작은걸로 10개를 불러와라 // Op는 operator
    const posts = await Post.findAll({
      where,
      limit: 10, // 10개만 가져와라
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      // 처음에는 게시글 생성일 내림차순(최신)으로 정렬한다음
      //  21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      include: [
        {
          model: User, // 작성자정보
          attributes: ['id', 'nickname'], // 작성자 비밀번호 보이면 안되니
        },
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
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    console.log('get 게시물', posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

//  // Get posts
//  router.get("/", async (req, res, next) => {
//      try {
//        const posts = await Post.findAll({
//          where: { id: lastId },
//          limit: 10, // 10개만 가져와라
//          offset: 0, // 1~10 , 리밋10,오프셋10이면 11~20이됨, 리밋10, 오프셋100 101~110
//          order: [["createdAt", "DESC"]],
//        });
//        res.status(200).json(posts);
//      } catch (error) {
//        console.error(error);
//        next(error);
//      }
//    });

//    module.exports = router;
