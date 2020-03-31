import {
  APP_NAME,
  ERROR_MESSAGES,
} from '../components/home/constants';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {put, takeEvery} from 'redux-saga/effects';

import {REQUEST_PERMISSION} from './actionTypes';
import {
  createToggleLoadingAction,
} from './actions';

const {PERMISSION: PERMISSION_ERROR} = ERROR_MESSAGES;

function* handlePermissionRequest() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const result = yield PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      if (!result) {
        const response = yield PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );

        if (!response) {
          yield Alert.alert(APP_NAME, PERMISSION_ERROR, [], {cancelable: true});
        }
      }
    } 
  } catch (error) {
    Alert.alert(APP_NAME, `${error}`, [], {cancelable: true});
  } finally {
    put(createToggleLoadingAction());
  }
}

export default function* saga() {
  yield takeEvery(REQUEST_PERMISSION, handlePermissionRequest);
}
