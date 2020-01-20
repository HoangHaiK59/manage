import { Constants } from '../define';
import {history} from '../../helper/history';
import {axiosClient} from '../../helper/axios';

const signinRequest = () => {
    return {
        type: Constants.SIGNIN_REQUEST
    }
}

const signinSuccess = (loginStatus, appInfo) => {
    return {
        type: Constants.SIGNIN_SUCCESS,
        loginStatus: loginStatus,
        appInfo: appInfo
    }
}

const signinError = (error) => {
    return {
        type: Constants.SIGNIN_ERROR,
        error: error
    }
}

const signin = () => {
    return dispatch => {
        dispatch(signinRequest());

        window.FB.getLoginStatus(response => {
            console.log(response.status);
            if (response.status === 'connected') {
                
            } else if (response.status === 'not_authorized') {
                dispatch(signinError({message: 'not_authorized'}));
                history.push('/');
            }
            else {
                return window.FB.login(res => {
                    console.log(res);

                    if(res.status === 'unknown') {
                        dispatch(signinError({message: 'not_authorized'}));
                        history.push('/');
                        return;
                    }
                    
                    window.FB.api(
                        `/debug_token`,
                        'GET',
                        {
                            input_token: res.authResponse.accessToken,
                            access_token: '510765909792429|bc9576b974be7435f3df39bc2152473b'
                        },
                        function(response) {
                            console.log(response);
                            if(response) {
                                dispatch(signinSuccess(res, response.data));
                            }
                            else 
                                dispatch(signinError({message: 'debug token fail'}))
                        }
                    )
                    history.push('/dashboard');
                }, { scope: 'email, manage_pages,pages_messaging, pages_show_list' })
            }
        });
    }
}

const signout = () => {
    return dispatch => {
        dispatch({type: Constants.SIGNOUT});

        window.FB.logout(function(response) {
            console.log(response)
        })

        history.push('/');
    }
}

const addUnpublishReq = () => {
    return {
        type: Constants.ADD_UNPUBLISH_REQ
    }
}

const addUnpublishSuccess = (creatives) => {
    return {
        type: Constants.ADD_UNPUBLISH_SUCCESS,
        creatives: creatives
    }
}

const addUnpublishError = (error) => {
    return {
        type: Constants.ADD_UNPUBLISH_ERROR,
        error: error
    }
}

const addUnpublish = (post) => {
    return dispatch => {
        dispatch(addUnpublishReq())
        axiosClient.post('http://localhost:8000/unpublish', {
            params: {
                post: post
            }
        })
        .then(res => {console.log(res);dispatch(addUnpublishSuccess(post))})
        .catch(err => {console.log(err);dispatch(addUnpublishError(err))})
        }
}


export const action = {
    signin,
    signout, 
    addUnpublish
};