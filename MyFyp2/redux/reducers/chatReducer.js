import {state, action} from 'react-redux';
const initialState = {chat: {chatId: null, chatName: null}};
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT':
      return Object.assign({}, state, {
        chat: {
          chatId: action.chatId,
          chatName: action.chatName,
          Access: action.access,
          photo: action.photo,
        },
      });

    default:
      return state;
  }
};
export default chatReducer;
