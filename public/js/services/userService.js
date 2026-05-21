const userService = {
  update: (email, password, passwordConfirmation) => api.put('/users/update', {
    user: { email, password, password_confirmation: passwordConfirmation }
  }),

  delete: (password) => api.delete('/users/destroy', { password }),
};
