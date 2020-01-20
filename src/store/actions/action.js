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

const addUnpublishSuccess = () => {
    return {
        type: Constants.ADD_UNPUBLISH_SUCCESS,
    }
}

const addUnpublishError = (error) => {
    return {
        type: Constants.ADD_UNPUBLISH_ERROR,
        error: error
    }
}

const addUnpublish = (unpublish) => {
    return dispatch => {
        dispatch(addUnpublishReq())
        axiosClient.post('/v1/unpublish/new', {
            params: {
                unpublish: unpublish
            }
        })
        .then(res => {
            console.log(res);
            dispatch(addUnpublishSuccess()); 
        })
        .catch(err => {console.log(err);dispatch(addUnpublishError(err))})
        }
}

const getUnpublishesReq = () => {
    return {
        type: Constants.GET_UNPUBLISHES_REQ
    }
}

const getUnpublishesSuccess = (unpublishes) => {
    return {
        type: Constants.GET_UNPUBLISHES_SUCCESS,
        unpublishes: unpublishes
    }
}

const getUnpublishesError = error => {
    return {
        type: Constants.GET_UNPUBLISHES_ERROR,
        error: error
    }
}

const getUnpublishes = () => {
    return dispatch => {
        dispatch(getUnpublishesReq());

        axiosClient.get('/v1/unpublishes')
        .then(res => {
            console.log(res);
            dispatch(getUnpublishesSuccess(res.data))
        })
        .catch(error => dispatch(getUnpublishesError(error)))
    }
}

const deloneUnpublishReq = () => {
    return {
        type: Constants.REMOVE_ONE_UNPUBLISH_REQ
    }
}

const deloneUnpublishSuccess = () => {
    return {
        type: Constants.REMOVE_ONE_UNPUBLISH_SUCCESS,
    }
}

const deloneUnpublishError = error => {
    return {
        type: Constants.REMOVE_ONE_UNPUBLISH_ERROR,
        error: error
    }
}

const deloneUnpublish = (id) => {
    return dispatch => {
        dispatch(deloneUnpublishReq());

        axiosClient.delete(`/v1/unpublishes`, {
            params: {
                id: Number(id).toString()
            }
        })
        .then(res => {
            console.log(res);
            dispatch(deloneUnpublishSuccess())
        })
        .catch(error => dispatch(deloneUnpublishError(error)))
    }
}


const delUnpublishesReq = () => {
    return {
        type: Constants.DELETE_UNPUBLISHES_REQ
    }
}

const delUnpublishesSuccess = () => {
    return {
        type: Constants.DELETE_UNPUBLISHES_SUCCESS,
    }
}

const delUnpublishesError = error => {
    return {
        type: Constants.DELETE_UNPUBLISHES_ERROR,
        error: error
    }
}

const delUnpublishes = () => {
    return dispatch => {
        dispatch(delUnpublishesReq());

        axiosClient.delete(`/v1/unpublishes`, {
            params: {
                type: 'unpublish'
            }
        })
        .then(res => {
            console.log(res);
            dispatch(delUnpublishesSuccess())
        })
        .catch(error => dispatch(delUnpublishesError(error)))
    }
}

export const action = {
    signin,
    signout, 
    addUnpublish,
    getUnpublishes,
    deloneUnpublish,
    delUnpublishes
};