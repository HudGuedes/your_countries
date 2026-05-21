const authService = {
  login: (email, password) => api.post('/login', { email, password }),

  register: (email, password, passwordConfirmation) => api.post('/register', {
    user: { email, password, password_confirmation: passwordConfirmation }
  }),

  logout: () => api.delete('/logout'),

  getCurrentUser: () => api.get('/current_user'),
};
