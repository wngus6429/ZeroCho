// 로그인 안한 사용자인지
export default function ({ store, redirect }) {
  // 로그인 했으면
  if (store.state.users.me) {
    redirect("/"); //메인페이지로
  }
}
