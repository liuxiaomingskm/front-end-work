import axios from "axios";
export function setTokenHeader(token){
    //当logout的时候  logout的程序会清空localStorage并且设置空user header是在页面首部和localStorage是两个概念
    //所以login时候需要添加页面首部  而logout时候需要清空页面首部header部分 
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }


}
/**
 * 
 * @param {string} method the http verb you want to use 
 * @param {string} path the route path/endpoint 
 * @param {object} data (optional) data in JSON form for POST requests
 */

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data)
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    // axios会返回对象{response:{data:{}}
                    return reject(err.response.data.error);
                })


    })



}