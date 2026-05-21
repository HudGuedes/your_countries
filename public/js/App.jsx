function App() {
  const { useState, useEffect } = React;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('login');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [editingCountry, setEditingCountry] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const data = await authService.getCurrentUser();
      if (data.success) {
        setUser(data.user);
        setPage('home');
      }
    } catch (err) {
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  }

  function handleAuth(userData) {
    setUser(userData);
    setPage('home');
  }

  function handleLogout() {
    setUser(null);
    setPage('login');
  }

  function handleView(country) {
    setSelectedCountry(country);
    setPage('detail');
  }

  function handleEdit(country) {
    setEditingCountry(country);
    setPage('form');
  }

  function handleCreate() {
    setEditingCountry(null);
    setPage('form');
  }

  function handleBack() {
    setPage('home');
    setSelectedCountry(null);
    setEditingCountry(null);
  }

  function handleEditAccount() {
    setPage('editAccount');
  }

  function handleUpdateUser(updatedUser) {
    setUser(updatedUser);
  }

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (page === 'login') {
    return (
      <LoginPage
        onAuth={handleAuth}
        onRegister={() => setPage('register')}
      />
    );
  }

  if (page === 'register') {
    return (
      <RegisterPage
        onAuth={handleAuth}
        onBack={() => setPage('login')}
      />
    );
  }

  if (page === 'home') {
    return (
      <HomePage
        user={user}
        onView={handleView}
        onEdit={handleEdit}
        onCreate={handleCreate}
        onEditAccount={handleEditAccount}
      />
    );
  }

  if (page === 'detail') {
    return (
      <DetailPage
        country={selectedCountry}
        onBack={handleBack}
      />
    );
  }

  if (page === 'form') {
    return (
      <FormPage
        country={editingCountry}
        onBack={handleBack}
      />
    );
  }

  if (page === 'editAccount') {
    return (
      <EditAccountPage
        user={user}
        onBack={handleBack}
        onUpdate={handleUpdateUser}
      />
    );
  }

  return null;
}
