import { call, put } from 'redux-saga/effects';
import {
    ForgetPasswordRequestAction,
    LoginRequestAction,
    RegisterRequestAction,
    forgetPasswordFailure,
    forgetPasswordSuccess,
    loginFailure,
    loginSuccess,
    logoutFailure,
    logoutSuccess,
    registerFailure,
    registerSuccess,
} from '../index';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type RegisterResponse = FirebaseAuthTypes.UserCredential;
type LoginResponse = FirebaseAuthTypes.UserCredential;
type LogoutResponse = FirebaseAuthTypes.UserCredential;
type ForgetResponse = FirebaseAuthTypes.UserCredential;

export function* register(
    action: RegisterRequestAction,
): Generator<unknown, void, RegisterResponse> {
    try {
        const { firstName, lastName, email, password } = action.payload;
        const cred = yield call(
            [auth(), auth().createUserWithEmailAndPassword],
            email.trim(),
            password,
        );
        const { uid } = cred.user;
        const isNewUser = cred.additionalUserInfo?.isNewUser ?? true;
        const currentUser = auth().currentUser;
        if (currentUser) {
            yield call([currentUser, currentUser.updateProfile], {
                displayName: firstName,
            });
        }
        yield put(registerSuccess(uid, isNewUser));
    } catch (error: any) {
        yield put(registerFailure((error = error.message)));
    }
}

export function* login(
    action: LoginRequestAction,
): Generator<unknown, void, LoginResponse> {
    try {
        const { email, password } = action.payload;
        const res = yield call(
            [auth(), auth().signInWithEmailAndPassword],
            email.trim(),
            password,
        );
        const { uid } = res.user;
        const isNewUser = res.additionalUserInfo?.isNewUser ?? false;

        yield put(loginSuccess(uid, isNewUser));
    } catch (error: any) {
        yield put(loginFailure((error = error.message)));
    }
}

export function* logout(): Generator<unknown, void, LogoutResponse> {
    try {
        yield call([auth(), auth().signOut]);
        yield put(logoutSuccess());
    } catch (error: any) {
        yield put(logoutFailure((error = error.message)));
    }
}

export function* forgetPassword(
    action: ForgetPasswordRequestAction,
): Generator<unknown, void, ForgetResponse> {
    try {
        const { email } = action.payload;
        yield call([auth(), auth().sendPasswordResetEmail], email.trim());
        yield put(forgetPasswordSuccess('Password reset email sent successfully'));
    } catch (error: any) {
        yield put(forgetPasswordFailure((error = error.message)));
    }
}