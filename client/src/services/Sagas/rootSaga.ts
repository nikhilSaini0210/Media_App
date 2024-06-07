import { all } from 'redux-saga/effects';
import { authSaga } from './sagaFunction';

export default function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}