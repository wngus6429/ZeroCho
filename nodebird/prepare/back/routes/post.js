const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
//params는 변수를 담는다
//게시글 작성
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, //게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, //좋아요 누른사람
          as: "Likers", //이렇게 해야 구별이됨
          attributes: ["id"],
        },
      ],
    });
    console.log("게시글작성", fullPost);
    res.status(201).json(fullPost); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//동적 주소를 파라미터라 한다  //POST /post/comment
router.post("/:postId/comment", isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }, //위에가 :postId니까
    });
    if (!post) {
      //post가 존재하지 않으면
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment); //이렇게 프론트로 돌려주고 그러면 saga, addpost 의 const result 이쪽에 들어감
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH /post/1/like
router.patch("/:postId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    //post 있는지 검사를 해야지
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    //포스트가 있따면
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /post/1/like
router.delete("/:postId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    //post 있는지 검사를 해야지
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id); //여기다가 그냥 SQL 적어도됨. mysql2 확인
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {
  //DELETE /post
  res.send("api post delete 창이다");
});

module.exports = router;

//DB조작 할때는 항상 await 붙여줘야함
