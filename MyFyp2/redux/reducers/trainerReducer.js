import {state, action} from 'react-redux';
const initialState = {trainer: {name: null, access: [], photo: null}};
const trainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRAINER':
      return Object.assign({}, state, {
        trainer: {
          name: action.name,
          access: action.access,
          photo: action.photo,
        },
      });

    default:
      return state;
  }
};
export default trainerReducer;
