import {
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
  } from './index';

export interface AuthState {
    loading: boolean;
    uid: string | null;
    isNewUser: boolean | null;
    error: string | null;
    message: string | null;
  }
  
  export interface RegisterRequestAction {
    type: typeof REGISTER_REQUEST;
    payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }
  
  export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: {
      uid: string;
      isNewUser: boolean;
    };
  }
  
  export interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE;
    payload: {
      error: string;
    };
  }
  
  export interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: {
      email: string;
      password: string;
    };
  }
  
  export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
      uid: string;
      isNewUser: boolean;
    };
  }
  
  export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: {
      error: string;
    };
  }
  
  export interface LogoutRequestAction {
    type: typeof LOGOUT_REQUEST;
  }
  
  export interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
  }
  
  export interface LogoutFailureAction {
    type: typeof LOGOUT_FAILURE;
    payload: {
      error: string;
    };
  }
  
  export interface ForgetPasswordRequestAction {
    type: typeof FORGET_PASSWORD_REQUEST;
    payload: {
      email: string;
    }
  }
  
  export interface ForgetPasswordSuccessAction {
    type: typeof FORGET_PASSWORD_SUCCESS;
    payload: {
      message: string;
    }
  }
  
  export interface ForgetPasswordFailureAction {
    type: typeof FORGET_PASSWORD_FAILURE;
    payload: {
      error: string;
    };
  }
  
  
  
  export type AuthAction =
    | RegisterRequestAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailureAction
    | ForgetPasswordRequestAction
    | ForgetPasswordSuccessAction
    | ForgetPasswordFailureAction;