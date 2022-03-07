export const state = () => ({
  me: null,
  followingList: ["qkrwngus", "cjswo", "fldjfdla"],
  followerList: ["박주현", "천재", "리얼임"],
});

// 뮤테이션안에는 비동기요청이 잇으면 안된다.
// 단순 동기적인 작업
export const mutations = {
  setMe(state, payload) {
    // 이 스테이트를 어떻게 바꿀껀지가 payload에 들어있음
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  removeFollowingOne(state, payload) {
    for (let i = 0; i < state.followingList.length; i++) {
      if (payload.name === state.followingList[i]) {
        state.followingList.splice(i, 1);
      }
    }
  },
  removeFollowerOne(state, payload) {
    for (let i = 0; i < state.followerList.length; i++) {
      if (payload.name === state.followerList[i]) {
        state.followerList.splice(i, 1);
      }
    }
  },
  addFollowingOne(state, payload) {
    state.followingList.push(payload);
  },
  addFollowerOne(state, payload) {
    state.followerList.push(payload);
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
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowingOne", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollowerOne", payload);
  },
  addFollowing({ commit }, payload) {
    commit("addFollowingOne", payload);
  },
  addFollower({ commit }, payload) {
    commit("addFollowerOne", payload);
  },
};
