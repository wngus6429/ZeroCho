import { all, fork, delay, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/api/post", data); //로그인 요청 함
}
function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

// 하나라도 action이 적은게 좋다
function* watchAddPost() {
  yield takeLatest("LOG_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}

// function* watchAddPost() {
//     yield throttle("LOG_POST_REQUEST", addPost, 2000); //2초동안 리퀘스트 딱 1번만
// }
