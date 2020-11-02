import { STOREKEY } from "next-redux-wrapper";

//초기 앱 데이터 구조를 잡아야함
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpDate: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
  };
};
// const changeNickname = {
//     type: "CHANGE_NICKNAME",
//     data: "boogicho",
//   };

//async action creator //비동기 action creator

// action creator 유저가 닉네임 어떻게 바꿀지 모르니 이렇게 해야함
const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};
changeNickname("boogicho");
// { type:"CHANGE_NICKNAME", data:"boogicho" }
store.dispatch(changeNickname("mighty tak")); //이게 좋지

// (이전 상태, 액션) => 다음 상태
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user, //안바꾸고 싶은건 ... 써서 참조
          isLoggedIn: true, //바꾸고 싶은걸 이렇게 적어준다.
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user, //안바꾸고 싶은건 ... 써서 참조
          isLoggedIn: false, //바꾸고 싶은걸 이렇게 적어준다.
          user: null,
        },
      };
  }
};

export default rootReducer;
