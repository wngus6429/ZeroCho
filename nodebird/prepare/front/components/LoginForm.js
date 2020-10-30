import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";

const LoginForm = () => {
  const [Id, setId] = useState("");
  const [password, setpassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  //useCallback 써야 성능이 좋아진다.
  const onChangePassword = useCallback((e) => {
    setpassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={Id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/singup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;

//label htmlFor랑 밑에 input name 이랑 연결 시킨거임
//type="primary 는 색을 담당한다
