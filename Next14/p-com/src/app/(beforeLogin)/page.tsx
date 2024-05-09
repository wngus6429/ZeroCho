import styles from "@/app/page.module.css"; //! module.css를 통해서 다른 파일이랑 구별을 해준다
//! 특정한 페이지나 레이아웃에 적용
// tailwind 호불호 많이 심함
// styled component -> Server Compoentn SSR 문제 있음.
// sass,
// cssmodule 간단하다
// vanilla extract -> 윈도우와 문제 있음.
import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../public/zlogo.jpg";

export default function Home() {
  return (
    <>
      <div className={styles.left}>
        <Image src={zLogo} alt="logo" />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는일</h1>
        <h2>지금 가입하세요.</h2>
        {/* a 태그 대신임. a 태그쓰면 페이지가 새로고침되면서 넘어감 */}
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/i/flow/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}
