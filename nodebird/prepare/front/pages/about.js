import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { END } from "redux-saga";

import { Avatar, Card } from "antd";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  //내 자신 정보가 서버사이드랜더링이 안되면 텅비게 나오겟지 밑에 null
  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

//서버사이드랜더링
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  console.log("getStaticProps");
  context.store.dispatch({
    type: LOAD_USER_REQUEST, //내 정보가 아니라 특정한 사람 정보
    data: 1,
  });
  context.store.dispatch(END); //서버사이드랜더링이 request가 success될떄까지 기다려주는거
  await context.store.sagaTask.toPromise();
});

export default Profile;
