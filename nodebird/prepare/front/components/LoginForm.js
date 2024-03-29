import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useinput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
  & Button {
    font-size: 15px;
    border-radius: 20px;
  }
`;

const FormWrapper = styled(Form)`
  padding: 10px;
  background-color: #d2f698;
  & label {
    font-size: 15px;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);
  // Saga 랑, reducer가 거의 동시에 실행된다 보면됨
  // useCallback 훅은 함수를 메모이제이션하여 불필요한 렌더링을 방지하고 성능을 최적화합니다.
  // 이 함수가 실행되는 경우, email과 password가 변경되었을 때만 함수를 새로운 값으로 다시 메모이제이션합니다.
  // 이렇게 함으로써, onSubmitForm 함수가 불필요하게 매번 새로 생성되는 것을 방지하고
  // 이전에 생성된 함수를 재사용하여 성능을 향상시킵니다.
  // 밑에 onFinish에는 e.preventDefault()되어 있음.
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor='user-email'>이메일</label>
        <br />
        <Input name='user-email' type='email' value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor='user-password'>비밀번호</label>
        <br />
        <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
      </div>
      <ButtonWrapper>
        <Button type='primary' htmlType='submit' loading={logInLoading}>
          로그인
        </Button>
        <Link href='/signup'>
          <a>
            <Button type='danger'>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

//const style = useMemo(()=>({ marginTop:10}),[])
//<ButtonWrapper style={style}></ButtonWrapper>

//label htmlFor랑 밑에 input name 이랑 연결 시킨거임
//type="primary 는 색을 담당한다
//htmlType="submit" 이 되어 있어야 위에 Form이 작동함 그리고 onFinish 가 호출이 된다
//그리고 onFinish에는 e.preventDefault()가 이미 되어져 있음
