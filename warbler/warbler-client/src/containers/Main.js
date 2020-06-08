import React from "react";
import { Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm.js";

const Main = (props) =>{
    const {authUser, errors, removeError, currentUser} = props;
  return (
        <div className="container">
                <Switch>
                    
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} /> 
                <Route exact path="/signin" render={props => {
                    return (
                        <AuthForm 
                        removeError={removeError}
                        errors={errors}
                        onAuth={authUser}
                        buttonText="Log in" 
                        heading="Welcome Back." 
                        {...props} />
                    )
                }} />
                <Route exact path="/signup" render={props => {
                    return (
                        <AuthForm
                        removeError={removeError}
                        errors = {errors}
                        onAuth={authUser}
                        signUp 
                        buttonText="Sign me up!" 
                        heading="Join Warbler Today!" 
                        {...props} />
                    )
                }} />
                <Route path="/users/:id/messages/new"  component={withAuth(MessageForm)}  />

                </Switch>


        </div>

  
);
            };
//这里的state是总的state 是rootReducer对应的state 但是rootReducer是有各个部分组成的(currentUser, errors), 这里是把
//currentUser和errors的子state赋予给Main这个部分的props 从来
function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}
//这里必须把authUser作为mapDispatchToProps传入connect之中 个人感觉上面已经把authUser作为props传给authForm了 为什么这里还要再传一次？
export default withRouter(connect(mapStateToProps,{authUser,removeError})(Main));

/*
mapDispatchToProps和mapStaetToProps 小结

mapDispatchToProps is the second argument passed into connect, it is used for dispatching actions to store.
If you don't specify the second argumetn to connect(), the component will receive dispatch by default.
Providing a mapDispatchToProps allow you to specify which actions your component might need to dispatch.It let you provide action 
dispatching functions as props. Instead of calling props.dispatch(()=> increment()) , you may call props.increment() directly.


mapStateToProps
As the first argument passed into connect, it is used for selecting the part of the data from store that the connected commponent needs.
It is called everytime the store state changes.
It receives the entire store state, and should return an object of data this component need.
It does not matter is a mapSteteToProps function is written using the funciton keyword or arrow function. They are the same.

WithRouter
You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. 
withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

*/