import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import reducer from "../reducers";

const configureStore = () => {
  const store = createStore(reducer);
  store.dispatch({
    type: "CHANGE_NICKNAME",
    data: "boogicho",
  });
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === "development" });
//두번째는 옵션 객체, debug를 true로 하는게 개발할떄 편함
export default wrapper;
