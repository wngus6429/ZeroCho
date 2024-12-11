import LoginModal from "@/app/(beforeLogin)/_component/LoginModal";

//! 서버컴포넌트
// 다른 페이지에서, 링크에서 접속 했을때는 가로채기 라우트실행 @modal 쪽
// i 밑에 폴더는 브라우저에서 직접 접근하거나, 주소를 쳐서 접근하거나, 새로고침 하거나
export default function Page() {
  return (
    <>
      @modal에로그인쪽컴포넌트
      <LoginModal />
    </>
  );
}
