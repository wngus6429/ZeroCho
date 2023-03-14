import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
//import withReduxSaga from "next-redux-saga";
import wrapper from '../store/configureStore';
//페이지들의 공통된 부분을 처리
//굳이 이름 App 이라고 할 필요 없음.
//App이 부모, index.js가 밑에 Component안으로

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Nodebird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // Component 프로퍼티는 반드시 React 요소(element)여야 하며
  // 필수적으로 전달되어야 함을 나타냅니다.
};

export default wrapper.withRedux(NodeBird);
//이렇게 감싸는걸 hoc로 감싼다라고 함, 존안 유튜브에서 나온듯?
