export const state = () => ({
  me: null,
});

// 뮤테이션안에는 비동기요청이 잇으면 안된다.
// 단순 동기적인 작업
export const mutations = {
  setMe(state, payload) {
    // 이 스테이트를 어떻게 바꿀껀지가 payload에 들어있음
    state.me = payload;
  },
};

//비동기 작업, 복잡한 작업, context안에 기능이 많다.
export const actions = {
  signUp({ commit }, payload) {
    // 서버에 회원가입 요청을 보냄
    commit("setMe", payload);
  },
  logIn(context, payload) {
    context.commit("setMe", payload);
  },
  logOut({ commit }) {
    commit("setMe", null);
  },
};
