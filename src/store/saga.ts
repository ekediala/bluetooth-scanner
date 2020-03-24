import { call, put, takeEvery } from 'redux-saga/effects';

import { Action } from 'redux';
import { CONNECT } from './actionTypes';

function* handleConnect(action: Action) {
    console.log(action);
}

export default function* saga() {
    yield takeEvery(CONNECT, handleConnect);
}