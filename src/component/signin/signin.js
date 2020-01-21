import React from 'react';
import { Button } from 'antd';
import { action } from '../../store/actions/action';
import {connect} from 'react-redux';
import { useUpdateTitle, IconFont } from '../../utils';

const useRedirect = (isAuth , fn) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = fn
    })
    React.useEffect(() => {
        ref.current()
    },[isAuth])
}


const Signin = ({title, ...props}) => {
    useUpdateTitle(title);
    useRedirect(props.isAuth , () => handleRedirect())
    const { signin } = props;

    const handleRedirect = () => {
        if(props.loginStatus !== null) {
            props.history.goForward()
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        signin();
    }

    return <div>
        <h1>Shu store</h1>
        <Button 
        onClick={handleLogin}>
        <IconFont type="icon-facebook"/>
        Login with Facebook
        </Button>
        <Button 
        onClick={props.signout}>
        <IconFont type="icon-facebook"/>
        Logout
        </Button>
    </div>
};

const mapState = (state) => (
    {
        isAuth: state.facebook.isAuth,
        loginStatus: state.facebook.loginStatus
    }
);

const mapDispatch = dispatch => (
    {
        signin:  () => dispatch(action.signin()),
        signout:  () => dispatch(action.signout())
    }
)

export default connect(mapState,mapDispatch)(Signin);
