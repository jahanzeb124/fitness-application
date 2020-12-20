import {state, action} from 'react-redux';
const initialState = {user: null};
const apiUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {
        user: action.user,
      });
    case 'LOG_OUT':
      return Object.assign({}, state, {
        user: null,
      });
    default:
      return state;
  }
};
export default apiUserReducer;
