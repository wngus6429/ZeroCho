const express = require('express');
const multer = require('multer');
const path = require('path'); //node에서 제공
const fs = require('fs'); //파일시스템을 조작할수 있는
const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
//params는 변수를 담는다
//게시글 작성

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uplaods폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      //제로초.png , 이름 같이 되는걸 막기 위해 날짜 붙이기
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //제로초
      done(null, basename + '_' + new Date().getTime() + ext); //제로초날짜.png
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 }, //15MB
}); // 대형 서비스되면 프론트에서 바로 클라우드로 가는 방법 써야함

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, //! passport/index 16줄에 req.user 생성
    }); // slice(1)은 앞에 해시태그 #를 떼버리는거 , 소문자, 대문자 둘다 되게 하기 위해 소문자 toLowerCase
    if (hashtags) {
      //! 해시태그 누가 등록 해뒀으면 등록하지말고, DB에 없으면 그때서야 등록하게 해야함
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        ) // [#노드, true],[#리액트, true] 두번째게 생성된건지 find된건지 불리언값
      ); // 뒤에 map한게 위에 findOrCreate때문,
      // 배열에서 첫번째값만 가져오기위해
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      // 이미지를 올린경우, post에 내용을 추가하기 위한 코드들
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러개 올리면 image:[제로초.png, 부기초.png] 이런식으로 옴
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        // create는 시퀄라이즈, promise.all로 한방에 DB에 저장된다 // DB에는 파일주소만 현재
        await post.addImages(images);
      } else {
        // 이미지를 하나만 올리면 image:제로초.png 배열이 아님
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image }, // 이미지 정보가 알아서 post.images로 들어감
        // 댓글 작성자
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
        // 게시글 작성자
        { model: User, attributes: ['id', 'nickname'] },
        //! 이게 있어야 post.Likers가 생긴다. 좋아요 누른사람, as를 해야 구별이됨
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    });
    console.log('게시글작성', fullPost);
    res.status(201).json(fullPost); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//! Post /post/images , array쓰는 이유는 여러장, single 쓰면 한장, 텍스트면 none
//! field는 이미지 올리는 칸이 2개 이상일 경우
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  //여기는 이미지 업로드 후에 실행된다
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

//SinglePost //GET /post/1   , 1번게시글 가져오기
router.get('/:postId', async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
        { model: User, attributes: ['id', 'nickname'] },
        { model: User, as: 'Likers', attributes: ['id', 'nickname'] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//리트윗 //POST, /post/1/retweet
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, // 위에가 :postId니까
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      // post가 존재하지 않으면
      return res.status(403).send('존재하지 않는 게시글입니다.');
    } //! 자기개시글을 직접 리트윗하는것. 자기게시글을 남이 리트윗한것을 자기가 다시 리트윗 하는걸 막을거임
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    } //! 게시글이 리트윗한건지 찾아보고 그거면 리트윗아이디를 쓰고 아니면 null인 애들은 post.id를 쓰고
    const retweetTargetId = post.RetweetId || post.id; // 남의게시글을 다른 사람이 리트윗한거를 그걸 다시 리트윗 한거
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet', //post모델 가보면 allowNull false되어있어서 반드시 넣어줘야함
    });
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }],
        },
        { model: User, attributes: ['id', 'nickname'] },
        // 좋아요 누른 사람
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: Image },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//동적 주소를 파라미터라 한다  //POST /post/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, //위에가 :postId니까
    });
    if (!post) {
      //post가 존재하지 않으면
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    console.log('시발바디',req.body);
    console.log('시발유저',req.user.id);
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ['id', 'nickname']}],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /post/1/like 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    //! post 있는지 검사를 해야지
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    //! 포스트가 있다면
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /post/1/unlike 좋아요 취소
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    //! post 있는지 검사를 해야지
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id); // 여기다가 그냥 SQL 적어도됨. mysql2 확인
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Patch /post
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  // PATCH /post/10
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0])); //setHashtags로 기존껄 대체 한다
    }
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /post
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      //! 시퀄라이즈에서는 제거할때 destory를 쓴다, 남이 삭제 못하게 2개로
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }, // 게시글 id랑, 내가 쓸 게시글
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

//DB조작 할때는 항상 await 붙여줘야함

//findone , finall로 조회, create로 만들고, destory로 삭제하고, 수정하는건
