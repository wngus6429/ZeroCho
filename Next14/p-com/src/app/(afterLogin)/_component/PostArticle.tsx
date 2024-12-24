"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

type Props = {
  children: ReactNode;
  post: Post;
};
// 서버컴포넌트는 클라이언트 컴포넌트 자식일떄
// children이나 props로 보낸다.
export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  let target = post;
  if (post.Original) {
    target = post.Original;
  }
  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    // onClickCapture 이벤트 캡쳐링, 클릭이벤트 a 태그 등등 겹치면 써보면됨
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}
