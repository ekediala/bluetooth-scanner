import {Action, Reducer} from 'redux';
import {
  POPULATE_FOUND_DEVICES,
  SET_CHOSEN_DEVICE,
  TOGGLE_SCANNING,
} from './actionTypes';

export interface AppState {
  scanning: boolean;
  devices: [];
  scanned: boolean;
  chosenDevice: any;
}

export interface ActionInterface extends Action {
  payload: any;
}

const initialState: AppState = {
  scanning: false,
  devices: [],
  scanned: false,
  chosenDevice: null,
};

const reducer: Reducer<any, any> = (
  state: AppState = initialState,
  action: ActionInterface,
) => {
  switch (action.type) {
    case POPULATE_FOUND_DEVICES:
      return {...state, devices: [...action.payload]};
    case TOGGLE_SCANNING:
      return {...state, scanning: !state.scanning};
    case SET_CHOSEN_DEVICE:
      return {...state, chosenDevice: action.payload};
    default:
      return {...state};
  }
};

export default reducer;
