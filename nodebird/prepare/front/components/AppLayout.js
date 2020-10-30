import React, { useState } from "react"; //없어도됨
import Proptypes from "prop-types";
import Link from "next/link"; //next 자체적 라우터
import { Menu, Input, Row, Col } from "antd";
import "antd/dist/antd.css";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const AppLayout = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>홈 화면</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원등록</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          왼쪽메뉴
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://wngus6429.github.io/NewPortFolio/" target="_blank" rel="noopener noreferrer">
            포트폴리오
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired, //리액트의 node
};

export default AppLayout;
