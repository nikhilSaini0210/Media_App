import {
    FORGET_PASSWORD_FAILURE,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    ForgetPasswordFailureAction,
    ForgetPasswordRequestAction,
    ForgetPasswordSuccessAction,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LoginFailureAction,
    LoginRequestAction,
    LoginSuccessAction,
    LogoutFailureAction,
    LogoutRequestAction,
    LogoutSuccessAction,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RegisterFailureAction,
    RegisterRequestAction,
    RegisterSuccessAction,
} from '../index';

export const registerRequest = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
): RegisterRequestAction => ({
    type: REGISTER_REQUEST,
    payload: { firstName, lastName, email, password },
});

export const registerSuccess = (
    uid: string,
    isNewUser: boolean,
): RegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    payload: { uid, isNewUser },
});

export const registerFailure = (error: string): RegisterFailureAction => ({
    type: REGISTER_FAILURE,
    payload: { error },
});

export const loginRequest = (
    email: string,
    password: string,
): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: { email, password },
});

export const loginSuccess = (
    uid: string,
    isNewUser: boolean,
): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: { uid, isNewUser },
});

export const loginFailure = (error: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    payload: { error },
});

export const logoutRequest = (): LogoutRequestAction => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string): LogoutFailureAction => ({
    type: LOGOUT_FAILURE,
    payload: { error },
});

export const forgetPasswordRequest = (email: string): ForgetPasswordRequestAction => ({
    type: FORGET_PASSWORD_REQUEST,
    payload: { email },
});

export const forgetPasswordSuccess = (message: string): ForgetPasswordSuccessAction => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: { message }
});

export const forgetPasswordFailure = (error: string): ForgetPasswordFailureAction => ({
    type: FORGET_PASSWORD_FAILURE,
    payload: { error },
});