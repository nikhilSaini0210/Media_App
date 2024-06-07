import { takeEvery } from 'redux-saga/effects';
import {
    FORGET_PASSWORD_REQUEST,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REGISTER_REQUEST,
} from '../index';
import { forgetPassword, login, logout, register } from './authSaga';


export function* authSaga() {
    yield takeEvery(REGISTER_REQUEST, register);
    yield takeEvery(LOGIN_REQUEST, login);
    yield takeEvery(LOGOUT_REQUEST, logout);
    yield takeEvery(FORGET_PASSWORD_REQUEST, forgetPassword);
}
