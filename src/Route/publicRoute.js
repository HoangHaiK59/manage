import React, { Fragment } from 'react';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({component: Component,restricted,title, ...rest}) => {
    return <Fragment>
        {
            <Route {...rest} render={props => (
                 restricted ?
                    <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
                : <Component {...props} title={title} />
            )} />
        }
    </Fragment>
};