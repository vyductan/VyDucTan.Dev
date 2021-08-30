import { call, put, takeLatest } from "redux-saga/effects";
import { selectCollection } from "../../services/firebase";
import { paragraphSlice } from "./paragraph";

const db = selectCollection<GroupItem>("groups");

function* loadData() {
  // let d;
  try {
    console.log("loading");
    const d: GroupItem[] = yield call(async () => {
      let r = await db.get();
      return r.docs.map((x) => x.data());
    });
    console.log("d:", d);
    yield put(groupsActions.fetchSuccess(d));
  } catch (e) {
    console.log("???");
    yield put(groupsActions.failure());
  }
}

function* add() {
  try {
  } catch (error) {}
}
export default function* groupsSaga() {
  yield takeLatest(groupsActions.fetch.toString(), loadData);
}
