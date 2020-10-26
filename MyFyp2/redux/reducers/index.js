import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import userReducer from './userreducer';

export default combineReducers({
  userReducer,
  chatReducer,
});
