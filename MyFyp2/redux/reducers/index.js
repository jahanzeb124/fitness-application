import {combineReducers} from 'redux';
import trainerReducer from './trainerReducer';
import chatReducer from './chatReducer';
import userReducer from './userreducer';
import apiUserReducer from './apiuserreducer';
import workoutReducer from './workoutReducer';

export default combineReducers({
  userReducer,
  chatReducer,
  trainerReducer,
  apiUserReducer,
  workoutReducer,
});
