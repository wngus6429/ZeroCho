// 로그인 했는지, context
export default function ({ store, redirect }) {
  // 로그인 안 했으면
  if (!store.state.users.me) {
    redirect("/");
  }
}
