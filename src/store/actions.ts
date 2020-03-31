import {
  POPULATE_FOUND_DEVICES,
  REQUEST_PERMISSION,
  SET_CHOSEN_DEVICE,
  TOGGLE_SCANNING,
} from './actionTypes';

import {ActionInterface} from './reducer';

export const createRequestPermissionAction = (): ActionInterface => ({
  type: REQUEST_PERMISSION,
  payload: null,
});

export const createToggleLoadingAction = (): ActionInterface => ({
  type: TOGGLE_SCANNING,
  payload: null,
});

export const createPopulateDevicesAction = (devices: any[]): ActionInterface => ({
  type: POPULATE_FOUND_DEVICES,
  payload: devices,
});

export const createSetChosenDeviceAction = (device: {}): ActionInterface => ({
  type: SET_CHOSEN_DEVICE,
  payload: device,
});
