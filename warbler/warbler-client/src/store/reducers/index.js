import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages"

const rootReducer =  combineReducers({
    currentUser, //析构函数的简便写法 相当于 currentUser: currentUser
    errors,
    messages
});

export default rootReducer;