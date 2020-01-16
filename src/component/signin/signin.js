import React from 'react';
import { Button } from 'antd';
import { action } from '../../store/actions/action';
import {connect} from 'react-redux';
import { useUpdateTitle, IconFont } from '../../utils';


const Signin = ({title, ...props}) => {
    useUpdateTitle(title);
    const { signin } = props;
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
    </div>
};

const mapState = (state) => (
    {

    }
);

const mapDispatch = dispatch => (
    {
        signin:  () => dispatch(action.signin()),
        //signout:  () => dispatch(action.signout())
    }
)

export default connect(mapState,mapDispatch)(Signin);
