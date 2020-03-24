import {Action, Reducer} from 'redux';

export interface AppState {
  peripheralID: string;
}

const initialState: AppState = {
  peripheralID: 'Peripheral id',
};

const reducer: Reducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'connect':
      return {...state};
    default:
      return { ...state };
  }
};

export default reducer;
