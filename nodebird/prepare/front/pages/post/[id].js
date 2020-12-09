import React from "react";
import { useRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { Head } from "next/head";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { useSelector } from "react-redux";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <title>{singlePost.User.nickname}님의 글</title>
      <meta name="description" content={singlePost.content} />
      <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
      <meta property="og:description" content={singlePost.content} />
      <meta
        property="og:image"
        content={singlePost.Images[0] ? singlePost.Images[0].src : "https://lcaohost:9000/favicon.png"}
      />
      <meta property="og:url" content={`https://lcaohost:9000/post/${id}`} />
      <PostCard post={singlePost} />
    </AppLayout>
  );
};
//og 이런게 카톡이나, 페북이런데 올리면, 미리보기 같은거임

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log("getServerSideProps start");
  console.log("context", context);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END); //next redux wrapper에 이렇게 하라고 적혀있음
  console.log("getServerSideProps end");
  await context.store.sagaTask.toPromise(); //이거는 configurestore에. sagaTask등록한거
});

//겟스타틱, 겟프롭스안에서는 context.params.id 또는 context.query.id하면 위에 userrouter에 똑같이 접근가능.

export default Post;
