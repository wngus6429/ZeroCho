"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};
// 서버컴포넌트는 클라이언트 컴포넌트 자식일떄
// children이나 props로 보낸다.
export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    // onClickCapture 이벤트 캡쳐링, 클릭이벤트 a 태그 등등 겹치면 써보면됨
    // <article onClickCapture={onClick} className={style.post}></article>
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}
