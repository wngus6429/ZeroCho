import shortId from "shortid";

//댓글 객체에 접근 할려면 게시글을 찾고 아이디를 통해서 찾고
//그 안에 Comments 여기로 접근,
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫번째 게시글 #해시태그, #익스프레스",
      Images: [
        {
          src:
            "https://cdnb.artstation.com/p/assets/images/images/029/822/295/smaller_square/sakimi-chan-kdaahri.jpg?1598749952",
        },
        {
          src:
            "https://p6m5s8c4.stackpathcdn.com/wp-content/uploads/2020/01/Screen-Shot-2020-01-28-at-12.11.51-PM.png",
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHrJIHYecs7LONs1yBDv7FmML5sSCoESzg9Q&usqp=CAU",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요",
        },
      ],
    },
  ],
  imagePaths: [], //이미지 경로들
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
//왜 User, Image, Comment만 첫글자에 대문자냐? db에서 쓰는 시퀄라이즈랑 관계있는데.어떤 정보와 다른 정보가 관게가 있으면 그것을 합쳐줌
//합쳐준 애들은 대문자가 되기 때문 , id나 content는 게시글 속성이고
//미리 서버 개발자한테 물어보는게 좋지
//action은 객체이다

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const dummyPost = (data) => ({
  id: shortId.generate(), //이놈을 key로 사용중
  content: data,
  User: {
    id: 1,
    nickname: "더미포스트",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(), //이놈을 key로 사용중
  content: data,
  User: {
    id: 1,
    nickname: "더미코멘트",
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostError: action.error };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS: {
      //action.data.content, postId, userId 가 들어있겟지
      //불변성의 핵심은 바뀌는것만 새로운 객체로 만들고 나머지느 ㄴ객체는 참조를 유지함
      //그래야 바뀌는것만 바뀌고 안바뀌는거는 참조가 계속 유지되서 메모리를 절약 하는거임
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
    }
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentError: action.error };
    default:
      return state;
  }
};

export default reducer;

// const ADD_POST = "ADD_POST";
// //이렇게 빼주면 좋은점이 밑에 ,case ADD_POST처럼 const값을 재활용 할수 있음
// //그리고 변수 선언으로 인해 오타 방지
// export const addPost = {
//   type: ADD_POST,
// };
