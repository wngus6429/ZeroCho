import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import useinput from '../hooks/useinput';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      router.replace('/'); // push 쓰면 뒤로가기 하면 있는데, replace는 아예 전꺼 삭제
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      router.replace('/'); //완료되면 메인페이지로
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useinput('');
  // const [Id, setId] = useState("");
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);
  const [nickname, onChangeNickName] = useinput('');
  // const [NickName, setNickName] = useState("");
  // const onChangeNickName = useCallback((e) => {
  //   setNickName(e.target.value);
  // }, []);
  const [password, onChangePassword] = useinput('');
  // const [Password, setPassword] = useState("");
  // const onChangePassword = useCallback((e) => {
  //   setPassword(e.target.value);
  // }, []);
  const [passwordError, setPasswordError] = useState(false); //비밀번호가 일치 하지 않으면 첫번쨰 true가 됨
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const [term, setTerm] = useState('');
  const [TermError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onsubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);
  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onsubmit}>
        <div>
          <label htmlFor='user-email'>이메일</label>
          <br />
          <Input name='user-email' type='email' value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor='user-id'>닉네임</label>
          <br />
          <Input name='user-id' value={nickname} onChange={onChangeNickName} required />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호 체크</label>
          <br />
          <Input name='user-password-check' type='password' value={passwordCheck} onChange={onChangePasswordCheck} required />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            내 말을 잘 들을것
          </Checkbox>
          {TermError && <ErrorMessage> 약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

//서버사이드 랜더링 이부분이 알아서 home보다 먼저 실행됨. 그래야 데이터 먼저 채우고 화면이 렌더링
//매개변수 context , 여긴 프론트서버에서 실행되는거임
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log('context', context);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const cookie = context.req ? context.req.headers.cookie : ''; //이걸 해야 서버쪽으로 쿠키가 전달이됨
  axios.defaults.headers.Cookie = ''; //이걸 해야 서버쪽으로 쿠키가 전달이됨
  if (context.req && cookie) {
    //서버일때랑 쿠키가 있을때 , 이런게 아니면 위에 "" //이렇게 안하면 서버에서 쿠키가 공유되서 다른사람이 내 아이디로 로그인되는
    axios.defaults.headers.Cookie = cookie;
  } //저희가 실제로 쿠키를 써서 요청을 보낼때만 잠깐 쿠키를 넣어놧다가 쿠키를 안써서 요청보낼때는 서버에서 공유하고 있는 쿠키를 제거하는 이부분이 제일 중요
  ////////////////////////////////////////////////////////////////////////////////////////
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END); //next redux wrapper에 이렇게 하라고 적혀있음
  await context.store.sagaTask.toPromise(); //이거는 configurestore에. sagaTask등록한거
}); //서버사이드랜더링이 request가 success될떄까지 기다려주는거

export default Signup;

//TermError는 제출할때 true가 됨
//Button type="primary"
//htmlType="submit" 할시 위에 onFinish가 호출됨. e.preventDefault() 내장 되어 있어서 안해도됨
