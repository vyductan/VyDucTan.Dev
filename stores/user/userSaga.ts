import { getSession } from "next-auth/client";
import { call, put, takeEvery } from "redux-saga/effects";
import { setUser } from "./userSlice";

function* fetchUser(action) {
  try {
    const user = yield call(getSession);
    yield put({ type: setUser.type, user: user });
  } catch (e) {}
}
export default function* userSaga() {
  yield takeEvery();
}
