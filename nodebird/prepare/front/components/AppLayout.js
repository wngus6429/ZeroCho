import React from "react"; //없어도됨
import Proptypes from "prop-types";
import Link from "next/link"; //next 자체적 라우터
import { Menu} from "antd";
import "antd/dist/antd.css";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>ホーム画面へ</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>会員登録</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/fun"><a>재미있는</a></Link>
        </Menu.Item>        
      </Menu>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired, //리액트의 node
};

export default AppLayout;
