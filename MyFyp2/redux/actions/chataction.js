export const chatAction = (chatId, chatName, Access, photo) => ({
  type: 'SET_CHAT',
  chatId: chatId,
  chatName: chatName,
  access: Access,
  photo: photo,
});
