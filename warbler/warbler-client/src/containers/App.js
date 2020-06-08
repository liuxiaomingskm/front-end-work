import React, { Component } from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";

const store = configureStore();

//当页面刷新的时候 如果发现token存在 那么在后续所有request的header里面设置token
if (localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone manually tampering with the key of jwtToken in localStorage
  //jwtDecode将会decode jwtToken的第二部分payload 从而解析出正确的user传入setCurrentUser作为参数，如果解析不出的话 直接
  //进入catch部分 清空user 防止有人篡改token（只要token有错误 马上清空user）
  try {
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }
  catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

const App  = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar /> 
        <Main />
                </div>
    </Router>

  </Provider>
)




export default App;
