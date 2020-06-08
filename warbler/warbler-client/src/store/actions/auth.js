import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
            localStorage.clear();
            setAuthorizationToken(false);
            dispatch(setCurrentUser({}));


    }

}

//这里的作用是根据signin,signup调用apiCall，后台登录或者注册新用户 然后在cookie中设置jwtToken并且因为后台会返回新用户
// 所以通过返回的user来发出动作更改当前用户状态（即设置当前用户状态）
export function authUser(type, userData){
    return dispatch => {
        //必须要等到apiCall调用完成 所以使用promise确保完成， userData就是request.body...的各种参数
        return new Promise((resolve, reject) => {
                return apiCall("post", `/api/auth/${type}`, userData).then(
                    //因为apiCall返回的结果就是一个新的user 里面包含名字,token等 所以直接用析构
                        ({token, ...user}) => {
                            localStorage.setItem("jwtToken", token);
                            setAuthorizationToken(token);
                            dispatch(setCurrentUser(user));
                            dispatch(removeError);
                            resolve();
                        }
                )
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                })
        })
    }
}

/*
localStorage知识点补充：
sessionStorage maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores)
Stores data only for a session, meaning that the data is stored until the browser (or tab) is closed.
Data is never transferred to the server.
Storage limit is larger than a cookie (at most 5MB).

localStorage does the same thing, but persists even when the browser is closed and reopened.
Stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.
Storage limit is the maximum amongst the three




*/