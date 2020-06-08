import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";
import currentUser from "../reducers/currentUser";

export const loadMessages =  messages => ({
    type:LOAD_MESSAGES,
    messages
});

export const remove = id => ({
    type: REMOVE_MESSAGE,
    id
});
export const removeMessage = (user_id, message_id) => {

    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
        .then(() => dispatch(remove(message_id)))
        .catch(err => dispatch(addError(err.message)));
    };
};

export const fetchMessages = () => {
    return dispatch => {
        //这里apiCall的method参数必须是小写！！！ 不能是GET会报错 a[method] is not a function
        return apiCall("get", "/api/messages").then(res => 
            dispatch(loadMessages(res))).catch(err => dispatch(addError(err.message)));
    };
};

//这里的连续两个箭头和参数有点懵逼 ， 不知道为什么这么写
export const postNewMessage = text => (dispatch, getState) => {

    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`,{text})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}