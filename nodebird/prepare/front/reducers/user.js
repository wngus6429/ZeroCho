export const initialState = {
  isLoggedIn: false, //로그인 시도중
  isLoggingIn: false, //
  isLoggingOut: false, //로그아웃 시도중
  me: null,
  signUpDate: {},
  loginData: {},
};
//export 해둬야 index.js에서 모으지

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
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
//store.dispatch(changeNickname('mighty tak')); //이게 좋지

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("Reducer User.js");
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggingIn: true, //바꾸고 싶은걸 이렇게 적어준다.
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggingIn: false,
        isLoggedIn: true, //바꾸고 싶은걸 이렇게 적어준다.
        me: { ...action.data, nickname: "zerocho" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggedIn: false, //바꾸고 싶은걸 이렇게 적어준다.
        isLoggingIn: false,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggingOut: true, //바꾸고 싶은걸 이렇게 적어준다.
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggingOut: false,
        isLoggedIn: false, //바꾸고 싶은걸 이렇게 적어준다.
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state, //안바꾸고 싶은건 ... 써서 참조
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
