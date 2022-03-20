export const state = () => ({
  me: null,
  followingList: [],
  followerList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;
//실무에서는 limit이 아니라 lastid 방식 사용

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
    // for (let i = 0; i < state.followingList.length; i++) {
    //   if (payload.name === state.followingList[i]) {
    //     state.followingList.splice(i, 1);
    //   }
    // }
    const index = state.followingList.findIndex((v) => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
  removeFollowerOne(state, payload) {
    // for (let i = 0; i < state.followerList.length; i++) {
    //   if (payload.name === state.followerList[i]) {
    //     state.followerList.splice(i, 1);
    //   }
    // }
    const index = state.followerList.findIndex((v) => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  addFollowingOne(state, payload) {
    state.followingList.push(payload);
  },
  addFollowerOne(state, payload) {
    state.followerList.push(payload);
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  },
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: Math.floor(Math.random() * 1000),
      }));
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
  },
};

//비동기 작업, 복잡한 작업, context안에 기능이 많다.
//앞에를 동작, 뒤를 자원 혹은 대상, 이렇게 두는 주소 체계를 restAPI라 부름
//실제로 RestAPI를 지키는 회사는 드물다. 대부분은 타협 비스무리하게
export const actions = {
  signUp({ commit }, payload) {
    console.log(this.$axios); //axios접근가능, nuxtcconfig.js에서 연결해서 사용가능
    // 서버에 회원가입 요청을 보냄
    this.$axios.post("user", {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    });
    // 애매하면 post를 쓰는게 좋다.
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
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings");
    }
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers");
    }
  },
};
