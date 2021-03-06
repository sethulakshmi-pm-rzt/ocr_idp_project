/**
 * commonSaga.js; a common saga for all requests
 * @author Akshay
 */
import { call, put } from "redux-saga/effects";
import { enableAction, disableAction } from "./actions";
import { request } from "./request";

export function* commonSaga(actions) {
	const { action, actionType, cb, ecb } = actions.urlParams;
	yield put(enableAction("LOADER"));
	const { response, error } = yield call(request, actions);
	if (response) {
		yield put({
			type: `${action}_${actionType}_SUCCESS`,
			payload: { data: response.data.entity }
		});
		if (cb) {
			cb();
		}
		yield put(disableAction("LOADER"));
	} else {
		yield put({
			type: `${action}_${actionType}_ERROR`,
			payload: { message: error.response.data.message }
		});
		if (ecb) {
			ecb(error.response.data);
		}
		yield put(disableAction("LOADER"));
	}
}
