import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입</title>
      </Head>
      <AppLayout>회원등록 페이지</AppLayout>
    </>
  );
};

export default Signup;
