import React, {Component} from "react";
import {connect} from "react-redux";

//hocs的意思是high order Components 即在普通Component外面再包装一层 加入一些判断是否login的逻辑
export default function withAuth(ComponentToBeRendered){
        class Authenticate extends Component {
            componentWillMount(){
                if(this.props.isAuthenticated === false){
                    this.props.history.push("/signin");
                }
            }
            componentWillUpdate(nextProps){
                if(nextProps.isAuthenticated === false){
                    this.props.history.push("/signin");
                }
            }
            render(){
                return <ComponentToBeRendered {...this.props} />
            }
        } 
        
        function mapStateToProps(state){
    return {
        isAuthenticated: state.currentUser.isAuthenticated
    };

}

return connect(mapStateToProps)(Authenticate)

}

