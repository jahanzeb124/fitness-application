export const trainerAction = (name, access, photo) => ({
  type: 'SET_TRAINER',
  name: name,
  access: access,
  photo: photo,
});
