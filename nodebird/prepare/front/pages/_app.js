import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
//페이지들의 공통된 부분을 처리
//굳이 이름 App 이라고 할 필요 없음.
//App이 부모, index.js가 밑에 Component안으로
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Nodebird</title>
      </Head>
      <div>공통메뉴</div>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isrequired,
};

export default wrapper.withRedux(NodeBird);
