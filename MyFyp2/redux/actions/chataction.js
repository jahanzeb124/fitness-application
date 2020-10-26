export const chatAction = (chatId, chatName, access, creator, members) => ({
  type: 'SET_CHAT',
  chatId: chatId,
  chatName: chatName,
  access: access,
  creator: creator,
  members: members,
});
