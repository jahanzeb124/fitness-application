import {state, action} from 'react-redux';
const initialState = {data: {}};
const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return Object.assign({}, state, {
        data: action.data,
      });

    default:
      return state;
  }
};
export default workoutReducer;
