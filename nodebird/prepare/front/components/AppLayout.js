import React from "react"; //없어도됨
import Proptypes from "prop-types";
import Link from "next/link"; //next 자체적 라우터

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/"><a>노드버드</a></Link>
        <Link href="/profile"><a>프로필</a></Link>
        <Link href="/signup"><a>회원가입</a></Link>
      </div>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired, //리액트의 node
};

export default AppLayout;
