import shortId from "shortid";
import produce from "immer";
//import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "./user";

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
          id: shortId.generate(),
          src:
            "https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/TRE/image/jSbbIDabdmD5S54u1gX-1W64ok0",
        },
        {
          id: shortId.generate(),
          src: "https://www.artinsight.co.kr/data/news/1910/833266554_iSIxjXoa_maxresdefault-3.jpg",
        },
        {
          id: shortId.generate(),
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHrJIHYecs7LONs1yBDv7FmML5sSCoESzg9Q&usqp=CAU",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
//왜 User, Image, Comment만 첫글자에 대문자냐? db에서 쓰는 시퀄라이즈랑 관계있는데.어떤 정보와 다른 정보가 관게가 있으면 그것을 합쳐줌
//합쳐준 애들은 대문자가 되기 때문 , id나 content는 게시글 속성이고
//대문자가 있는 것들은 id가 있어야함
//미리 서버 개발자한테 물어보는게 좋지
//action은 객체이다

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

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
  id: data.id, //AddPost 할때 id 만들어줌
  content: data.content,
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
});

export const dummyComment = (data) => ({
  id: shortId.generate(), //이놈을 key로 사용중
  content: data,
  User: {
    id: 1,
    nickname: "더미코멘트",
  },
});

//reducer란 이전 상태를 액션을 통해 다음 상태로 만들어내는
//immer가 불변성을 도와줌
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break; //break 꼭 적어야함
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      case ADD_POST_FAILURE:
        draft.addPostLoading = true;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      //   //action.data.content, postId, userId 가 들어있겟지
      //   //불변성의 핵심은 바뀌는것만 새로운 객체로 만들고 나머지느 ㄴ객체는 참조를 유지함
      //   //그래야 바뀌는것만 바뀌고 안바뀌는거는 참조가 계속 유지되서 메모리를 절약 하는거임
      //   const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      //   const post = { ...state.mainPosts[postIndex] };
      //   post.Comments = [dummyComment(action.data.content), ...post.Comments];
      //   const mainPosts = [...state.mainPosts];
      //   mainPosts[postIndex] = post;
      //   return {
      //     ...state,
      //     mainPosts,
      //     addCommentLoading: false,
      //     addCommentDone: true,
      //   }; //dummyPost가 앞에 있어야 함 뒤에 있으면 게시글 맨 아래에 추가됨
      // }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;

// const ADD_POST = "ADD_POST";
// //이렇게 빼주면 좋은점이 밑에 ,case ADD_POST처럼 const값을 재활용 할수 있음
// //그리고 변수 선언으로 인해 오타 방지
// export const addPost = {
//   type: ADD_POST,
// };
