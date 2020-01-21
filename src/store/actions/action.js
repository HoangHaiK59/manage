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
        axiosClient.post('/v1/unpublish', {
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
        type: Constants.REMOVE_UNPUBLISH_REQ
    }
}

const deloneUnpublishSuccess = () => {
    return {
        type: Constants.REMOVE_UNPUBLISH_SUCCESS,
    }
}

const deloneUnpublishError = error => {
    return {
        type: Constants.REMOVE_UNPUBLISH_ERROR,
        error: error
    }
}

const deloneUnpublish = (id) => {
    return dispatch => {
        dispatch(deloneUnpublishReq());

        axiosClient.delete(`/v1/unpublish`, {
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

const addScheduleReq = () => ({
    type: Constants.ADD_SCHEDULE_REQ
});

const addScheduleSuccess = () => ({
    type: Constants.ADD_SCHEDULE_SUCCESS
});

const addScheduleError = error => ({
    type: Constants.ADD_SCHEDULE_ERROR,
    error: error
})

const addSchedule = (schedule) => {
    return dispatch => {
        dispatch(addScheduleReq());

        axiosClient.post('/v1/schedule',{
            params: {
                schedule: schedule
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.success) {
                dispatch(addScheduleSuccess())
            }else {
                dispatch(addScheduleError(res.data))
            }
        })
        .catch(error => dispatch(addScheduleError(error)))
    }
}


const delScheduleReq = () => ({
    type: Constants.DEL_SCHEDULE_REQ
});

const delScheduleSuccess = () => ({
    type: Constants.DEL_SCHEDULE_SUCCESS
});

const delScheduleError = error => ({
    type: Constants.DEL_SCHEDULE_ERROR,
    error: error
});

const delSchedule = (id) => {
    return dispatch => {
        dispatch(delScheduleReq());

        axiosClient.delete('/v1/schedule', {
            params: {
                id: id
            }
        })
        .then(res => {
            console.log(res);
            dispatch(delScheduleSuccess());
        })
        .catch(error => dispatch(delScheduleError(error)))
    }
}

const delSchedulesReq = () => ({
    type: Constants.DEL_SCHEDULES_REQ
});

const delSchedulesSuccess = () => ({
    type: Constants.DEL_SCHEDULES_SUCCESS
});

const delSchedulesError = error => ({
    type: Constants.DEL_SCHEDULES_ERROR,
    error: error
});

const delSchedules = () => {
    return dispatch => {
        dispatch(delSchedulesReq());

        axiosClient.delete('/v1/schedules', {
            params: {
                type: 'schedule'
            }
        })
        .then(res => dispatch(delSchedulesSuccess()))
        .catch(error => dispatch(delSchedulesError(error)))
    }
};

const getSchedulesReq = () => ({
    type: Constants.GET_SCHEDULES_REQ
});

const getSchedulesSuccess = (schedules) => ({
    type: Constants.GET_SCHEDULES_SUCCESS,
    schedules: schedules
});

const getSchedulesError = error => ({
    type: Constants.GET_SCHEDULES_ERROR,
    error: error
});

const getSchedules = () => {
    return dispatch => {
        dispatch(getSchedulesReq());

        axiosClient.get('/schedules')
        .then(res => {
            dispatch(getSchedulesSuccess(res.data));
        })
        .catch(error => dispatch(getSchedulesError(error)))
    }
}


export const action = {
    signin,
    signout, 
    addUnpublish,
    getUnpublishes,
    deloneUnpublish,
    delUnpublishes,
    addSchedule,
    delSchedule,
    delSchedules,
    getSchedules
};