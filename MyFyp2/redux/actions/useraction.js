export const loginUser = (user) => ({
  type: 'LOG_IN',
  user: user,
});
export const logoutUser = () => ({
  type: 'LOG_OUT',
});
