export const state = () => ({
  mainPosts: [],
});

export const mutations = {
  addMainPosts(state, payload) {
    state.mainPosts.unshift(payload);
    //최신글은 앞에 보여줘야 해서 unshift
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
};

export const actions = {
  add({ commit }, payload) {
    // 서버에 게시글 등록 요청 보냄
    commit("addMainPosts", payload);
    // commit("addMainPost", payload, { root: true });
    // root:true 이걸하면 스토어 index.js에 addMainPost를 부를수 있음
  },
  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },
};
