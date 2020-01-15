import React from 'react';
import { Layout, Row, Col, Icon } from 'antd';
import Navigation from '../component/navigation/navigation';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../Route/privateRoute';
import { PublicRoute } from '../Route/publicRoute';
import Signin from '../component/signin/signin';
import Dashboard from '../component/dashboard/dashboard';
import PageInfo from '../component/pageinfo/pageinfo';
import Tasks from '../component/tasks/tasks';
import { isLogin } from '../utils';
import Posts from '../component/posts/posts';
import { connect } from 'react-redux';
import { action } from '../store/actions/action';
const { Content, Footer } = Layout;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

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
    console.log(props)
    return <Layout className="layout">
        <Content>
            <Row>
                {/* <Col span={3} style={{margin: '45px 0 0 0'}}>
                    <Navigation />
                </Col> */}
                <Col span={1}>
                    {loginStatus ? <Navigation handleSignout={handleSignout} disableNavigation={handleActive}/>: null}
                </Col>
                <Col span={23}>
                    <div style={{ background: '#fff', margin: '20px 0 0 0', padding: 24, minHeight: 900, position: 'relative' }}>
                        <Switch>
                            <Route path="/" render={() => <Signin />} exact />
                            <PrivateRoute path="/dashboard" title="Dashboard" isAuth={true} component={Dashboard} exact />
                            <PrivateRoute path="/pageinfo" title="Page Infomation" isAuth={isAuth} component={PageInfo} exact />
                            <PrivateRoute path="/tasks" title="Tasks" isAuth={isAuth} component={Tasks} exact />
                            <PrivateRoute path="/posts" loginStatus={loginStatus} isAuth={isAuth} title="Posts" component={Posts} exact />
                        </Switch>
                    </div>
                </Col>
            </Row>

        </Content>
        <Footer style={{ textAlign: 'center' }}>
            <IconFont type="icon-facebook"/> Manager facebook page
        </Footer>
    </Layout>
}

const mapState = state => ({
    isAuth: state.facebook.isAuth,
    loginStatus: state.facebook.loginStatus,
    appInfo: state.facebook.appInfo
});

const mapDispatch = dispatch => ({
    signout: () => dispatch(action.signout())
})

export default connect(mapState, mapDispatch)(Container);