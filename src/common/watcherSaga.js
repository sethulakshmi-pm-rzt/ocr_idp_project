/**
 * watcherSaga.js; Saga to watch the actions
 * @author Akshay
 */
import { takeLatest } from "redux-saga/effects";
import { commonSaga } from "./commonSaga";
import { fileSaga } from "./fileSaga";

export function* watcherSaga() {
	yield takeLatest("CREATE_TOKEN", commonSaga);
	yield takeLatest("UPLOAD_FILE", fileSaga);
}
