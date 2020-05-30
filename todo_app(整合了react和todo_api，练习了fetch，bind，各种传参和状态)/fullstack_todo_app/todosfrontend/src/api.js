/* global fetch */
const APIURL = 'api/todos/';

export async function getTodos(){
    return fetch(APIURL)
      .then(resp =>{ 
        if (!resp.ok){
          if (resp.status >= 400  && resp.status < 500){
            return resp.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errMessage :"Please try again later, server is not responding."}
            throw err;
          }
        }
        /*
        console.log('resp:',resp); //resp是一个一长串的object 含有status code， type, url等等各种key
        console.log('typeofResp', typeof(resp)); //类型是object
        console.log("resp.json:", resp.clone().json()); //这里必须是clone resp.json只能出现一次 返回的是一个promise 含有promise Value, promise Status */
        return resp.json();
      
    })
}
export async function createTodo(val){
     return fetch(APIURL,{
        method: 'post',
        headers: new Headers({
          'Content-Type':'application/json'
        }),
        body:JSON.stringify({name:val})  //这里不能直接传val 因为api需要的是body 体现为{name: val} 况且这里要字符串化
      })
      .then(resp => {
        if (!resp.ok){
          if (resp.status >= 400 && resp.status < 500){
            return resp.json().then(data =>{
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err  = {errorMessage: 'Please try again later, server is not responding.'};
            throw err;
          }
        }
        return resp.json();
      })
}

export async function removeTodo(id){
    const deleteURL = APIURL + id;
       return  fetch(deleteURL,{
        method: 'delete'
      })
      .then(resp => {
        if (!resp.ok){
          if (resp.status >= 400 && resp.status < 500){
            return resp.json().then(data =>{
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err  = {errorMessage: 'Please try again later, server is not responding.'};
            throw err;
          }
        }
        return resp.json();
      })
}
export async function updateTodo(todo){
    const updateURL = APIURL + todo._id;
      return   fetch(updateURL,{
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({completed: !todo.completed})
      })
      .then(resp => {
        if (!resp.ok){
          if (resp.status >= 400 && resp.status < 500){
            return resp.json().then(data =>{
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err  = {errorMessage: 'Please try again later, server is not responding.'};
            throw err;
          }
        }
        return resp.json();
      })
  
}