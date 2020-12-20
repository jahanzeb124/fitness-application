import {combineReducers} from 'redux';
import trainerReducer from './trainerReducer';
import chatReducer from './chatReducer';
import userReducer from './userreducer';
import apiUserReducer from './apiuserreducer';

export default combineReducers({
  userReducer,
  chatReducer,
  trainerReducer,
  apiUserReducer,
});
