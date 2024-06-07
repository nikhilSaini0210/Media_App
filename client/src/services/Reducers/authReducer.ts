import {
    AuthAction,
    AuthState,
    FORGET_PASSWORD_FAILURE,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../index';

const initialState: AuthState = {
    loading: false,
    uid: null,
    isNewUser: null,
    error: null,
    message: null,
};

export const authReducer = (
    state = initialState,
    action: AuthAction,
): AuthState => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case FORGET_PASSWORD_REQUEST:    
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                uid: action.payload.uid,
                isNewUser: action.payload.isNewUser,
                error: null,
            };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case FORGET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                uid: null,
                isNewUser: null,
                error: null,
                message: null,
            };
        case FORGET_PASSWORD_SUCCESS: 
            return{
                ...state,
                loading: false,
                message: action.payload.message,
            }    
        default:
            return state;
    }
};