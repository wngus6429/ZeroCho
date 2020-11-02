import React, from "react"; //없어도됨
import Proptypes from "prop-types";
import Link from "next/link"; //next 자체적 라우터
import { Menu, Input, Row, Col } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import {useSelector} from "react-redux" //리액트랑 리덕스 연결

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false); //리덕스가 있어서
const isLoggedIn = useSelector(state => state.user.isLoggedIn) //isLoggedIn이 바뀌면 알아서 applayout이 리랜더링

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
          <SearchInput enterButton />
          {/* <Input.Search enterButton style={{ verticalAlign: "middle" }} /> */}
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

// target="_blank" rel="noopener noreferrer" 보안관련
