/**
 * rootReducer.js
 */
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { enableWithNamedType, fetchWithNamedType } from "../common/reducers";

const rootReducer = combineReducers({
	form: formReducer,
	file: fetchWithNamedType("FILE"),
	loader: enableWithNamedType("LOADER"),
});

export default rootReducer;
