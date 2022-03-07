export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  // 계속 10개 불렀는데 갑자기, 적어지면 끝자락 이라는거니까 false로 하는거지
  // 계속 true로 하면 서버에 계속 요청하는 공격 행위가 될수도 있다.
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
  addMainPosts(state, payload) {
    state.mainPosts.unshift(payload);
    //최신글은 앞에 보여줘야 해서 unshift
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload); //그 게시글에 댓글추가
  },
  loadPosts(state) {
    // 실무에서는 2가지 개념 더 들어감, 스로틀링과 리밋방법을 안씀.
    // DB에서 데이터 아직 안왔는데. 고객들 스크롤 위로 왓다리 갓다리 많이 할수도 있고
    // 실무에서는 limit 방식으로 안하고 마지막 lastId 기반으로 함.
    // 마지막에 불러온 게시글 그 ID 그 뒤에 게시글 10개 불러오기 이런식으로
    // totalpost가 바뀌기에 실무에서는 limit 방식으로 안한다. 나중에 스로틀링, totalpost나중에 바꿀 예정
    // 전체 - 현재 내가불러온 갯수 = 아직 안 불러온 게시글수
    const diff = totalPosts - state.mainPosts.length;
    //빈 배열 만들기 10보다 크면 10개를 부르면 되고 10보다 작으면 작게 불러오고
    const fakePosts = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: "제로초",
        },
        content: `Hello infinite scroll~${Math.random().toString()}`,
        Comments: [],
        Images: [],
      }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
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
  addComment({ commit }, payload) {
    commit("addComment", payload);
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      //이거 안스면 디도스 공격이지
      commit("loadPosts");
    }
  },
};
