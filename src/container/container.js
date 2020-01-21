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
import Creative from '../component/creative/creative';
import Unpublish from '../component/content/unpublish/unpublish';
import Schedule from '../component/content/schedule/schedule';
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
                if(response.data === null || response.data === undefined  || response.error) {
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
                            <PublicRoute path="/" title="Signin" component={Signin} isAuth={false} restricted={false} exact/>
                            <PrivateRoute path="/dashboard" title="Dashboard" isAuth={true}  handleVerify={handleVerify} component={Dashboard} exact />
                            <PrivateRoute path="/store" title="Store" isAuth={isAuth}  handleVerify={handleVerify}  component={Store} exact />
                            <PrivateRoute path="/tasks" title="Tasks" isAuth={isAuth}  handleVerify={handleVerify}  component={Tasks} exact />
                            <PrivateRoute path="/posts"  isAuth={isAuth}  title="Posts" handleVerify={handleVerify} component={Posts} exact />
                            <PrivateRoute path="/analystic" isAuth={isAuth}  title="Analystic" handleVerify={handleVerify} component={Analystic} exact />
                            <PrivateRoute path="/creative" isAuth={isAuth}  title="Creative" handleVerify={handleVerify} component={Creative} exact />
                            <PrivateRoute path="/creative/unpublish" isAuth={isAuth}  title="Unpublish" handleVerify={handleVerify} component={Unpublish} exact />
                            <PrivateRoute path="/creative/schedule" isAuth={isAuth}  title="Schedule" handleVerify={handleVerify} component={Schedule} exact />
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