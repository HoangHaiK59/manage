import React from 'react';
import { Layout, Row, Col } from 'antd';
import Navigation from '../component/navigation/navigation';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../Route/privateRoute';
import { PublicRoute } from '../Route/publicRoute';
import Signin from '../component/signin/signin';
import Dashboard from '../component/dashboard/dashboard';
import Store from '../component/shustore/shustore';
import Tasks from '../component/tasks/tasks';
import Posts from '../component/posts/posts';
import { connect } from 'react-redux';
import { action } from '../store/actions/action';
import { history } from '../helper/history';
import { IconFont } from '../utils';
import Analystic from '../component/analystic/analystic';
const { Content, Footer } = Layout;

const Container = props => {
    const [visible, setVisible] = React.useState(false);
    const handleActive = () => {
        setVisible(!visible);
    }
    const {isAuth ,signout, loginStatus} = props;

    const handleSignout = () => {
        signout();
        //handleActive();
    }

    const handleVerify = (token) => {
        if(token === '') return ;
        window.FB.api(
            `/debug_token`,
            'GET',
            {
                input_token: token,
                access_token: '510765909792429|bc9576b974be7435f3df39bc2152473b'
            },
            function(response) {
                if(!response.data || response.error) {
                    signout();
                    history.push('/');
                }
            }
        )
    }

    return <Layout className="layout">
        <Content>
            <Row>
                {/* <Col span={3} style={{margin: '45px 0 0 0'}}>
                    <Navigation />
                </Col> */}
                <Col span={1}>
                    {loginStatus ? <Navigation handleSignout={handleSignout} disableNavigation={handleActive}/>: null}
                </Col>
                <Col span={23} id="mainview">
                    <div className="container">
                        <Switch>
                            <PublicRoute path="/" title="Signin" component={Signin} restricted={false} exact/>
                            <PrivateRoute path="/dashboard" title="Dashboard" isAuth={true} loginStatus={loginStatus} handleVerify={handleVerify}  component={Dashboard} exact />
                            <PrivateRoute path="/store" title="Store" isAuth={isAuth} loginStatus={loginStatus} handleVerify={handleVerify}  component={Store} exact />
                            <PrivateRoute path="/tasks" title="Tasks" isAuth={isAuth} loginStatus={loginStatus} handleVerify={handleVerify}  component={Tasks} exact />
                            <PrivateRoute path="/posts" loginStatus={loginStatus} isAuth={isAuth}  title="Posts" handleVerify={handleVerify} component={Posts} exact />
                            <PrivateRoute path="/analystic" loginStatus={loginStatus} isAuth={isAuth}  title="Analystic" handleVerify={handleVerify} component={Analystic} exact />
                        </Switch>
                    </div>
                </Col>
            </Row>

        </Content>
        <Footer style={{ textAlign: 'center' }}>
            <IconFont type="icon-facebook"/> SHU Store 
        </Footer>
    </Layout>
}

const mapState = state => ({
    isAuth: state.facebook.isAuth,
    loginStatus: state.facebook.loginStatus,
});

const mapDispatch = dispatch => ({
    signout: () => dispatch(action.signout())
})

export default connect(mapState, mapDispatch)(Container);