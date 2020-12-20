export const ApiloginUser = (user) => ({
  type: 'LOG_IN',
  user: user,
});
export const ApilogoutUser = () => ({
  type: 'LOG_OUT',
});
