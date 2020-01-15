import { Constants } from "../define";

const initState = {
    isAuth: false,
    loginStatus: null,
    appInfo: null,
    error: null
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Constants.SIGNIN_REQUEST:
            return { ...state, isAuth: false };
        case Constants.SIGNIN_SUCCESS:
            return {
                ...state,
                loginStatus: action.loginStatus,
                appInfo: action.appInfo,
                isAuth: true
            };
        case Constants.SIGNIN_ERROR:
            return {
                ...state,
                isAuth: false,
                error: action.error
            }
        case Constants.SIGNOUT:
            return {
                ...initState
            }
        default:
            return state;
    }
};

export default reducer;