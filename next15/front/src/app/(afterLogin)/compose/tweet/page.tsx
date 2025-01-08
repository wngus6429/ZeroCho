import Home from "@/app/(afterLogin)/home/page";
import TweetModal from "@/app/(afterLogin)/@modal/(.)compose/tweet/page";

// 게시하기 눌러서 모달 띄우고 F5 눌렀을 때 이게 나옴
export default function Page() {
  return (
    <>
      컴포즈 트윗 페이지
      <Home />
      <TweetModal />
    </>
  );
}
