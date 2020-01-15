import React, { Fragment } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Breadcrumb} from 'antd';

export const PrivateRoute = ({component: Component,title,isAuth,loginStatus, appInfo, ...rest}) => {
    return <Fragment>
        <div>
            {
                title ?
                <Breadcrumb >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>{title}</Breadcrumb.Item>
                </Breadcrumb> :
                <></>
            }
        </div>
        {
            <Route {...rest} render={props => 
                isAuth ?
                    <Component {...props} appInfo={appInfo} loginStatus = {loginStatus} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />
            } />
        }
    </Fragment>
};