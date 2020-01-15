import React from 'react';
import { Button, Icon } from 'antd';
import { action } from '../../store/actions/action';
import {connect} from 'react-redux';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });


const Signin = props => {
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
        signin:  () => dispatch(action.signin())
    }
)

export default connect(mapState,mapDispatch)(Signin);
