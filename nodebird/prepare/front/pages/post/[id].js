import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
// import { Head } from 'next/head';
import { useSelector } from 'react-redux';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  console.log('싱글', singlePost);

  useEffect(() => {
    if (!singlePost) {
      router.push('/');
    }
  }, [singlePost, router]);

  return (
    <AppLayout>
      {singlePost ? (
        <>
          <title>{singlePost.User.nickname}님의 글</title>
          <meta name='description' content={singlePost.content} />
          <meta property='og:title' content={`${singlePost.User.nickname}님의 게시글`} />
          <meta property='og:description' content={singlePost.content} />
          <meta property='og:image' content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://localhost:9000/picture.png'} />
          <meta property='og:url' content={`https://localhost:9000/post/${id}`} />
          <PostCard post={singlePost} />
        </>
      ) : (
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>데이터가 없습니다</h1>
      )}
    </AppLayout>
  );
};
//! og 이런게 카톡이나, 페북이런데 올리면, 미리보기 같은거임

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
//     fallback: true, //false는 위 params 에 적혀 있지 않으면 에러가 뜸
//   };
// }
// getStaticPaths는 미리 그 페이지들을 빌드해서 html로 만드는데, 근데 다이나믹페이지,라우팅니까 뭘 미리 만들어야 할지 모름
// 그래서 미리 만들어주는거임 , 저렇게 id 등록을 해줘야 함. 근데 개인 블로그나 글 적어서 괜찮은데. SNS 수백수천수억은 답도 없지

//export const getStaticProps = wrapper.getStaticProps(async (context) => {
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log('context', context);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
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
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise(); //이거는 configurestore에. sagaTask등록한거
});
// 겟스타틱, 겟프롭스안에서는 context.params.id 또는 context.query.id하면
// 위에 userrouter에 똑같이 접근가능.

export default Post;
