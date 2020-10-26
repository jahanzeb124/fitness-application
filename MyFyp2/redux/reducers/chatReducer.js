import {state, action} from 'react-redux';
const initialState = {chat: {chatId: 5, chatName: 'usman'}};
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT':
      return Object.assign({}, state, {
        chat: {
          chatId: action.chatId,
          chatName: action.chatName,
          Access: action.access,
          Creator: action.creator,
          members: action.members,
        },
      });

    default:
      return state;
  }
};
export default chatReducer;
