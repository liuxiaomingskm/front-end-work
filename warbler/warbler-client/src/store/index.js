import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

//thunk的作用是延迟函数生效， window.REDUX是为了方便使用插件debug
export function  configureStore(){
    const store = createStore(
            rootReducer,
            compose(applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
            )

    );
    return store;
}