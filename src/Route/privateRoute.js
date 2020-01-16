import React, { Fragment } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Breadcrumb} from 'antd';

export const PrivateRoute = ({component: Component,title,isAuth,loginStatus, handleVerify, ...rest}) => {
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
                isAuth|| loginStatus ?
                    <Component {...props} title={title} handleVerify={handleVerify} loginStatus = {loginStatus} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />
            } />
        }
    </Fragment>
};