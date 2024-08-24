// import styles from "@/app/page.module.css"; //! module.css를 통해서 다른 파일이랑 구별을 해준다
//! 특정한 페이지나 레이아웃에 적용
// tailwind 호불호 많이 심함
// styled component -> Server Compoentn SSR 문제 있음.
// sass,
// cssmodule 간단하다
// vanilla extract -> 윈도우와 문제 있음.
import { redirect } from "next/navigation";
import Main from "./_component/Main";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
    return null;
  }
  return <Main />;
}
