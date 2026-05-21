function LoginPage({ onAuth, onRegister }) {
  const { useState } = React;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(email, password);
      if (data.success) {
        onAuth(data.user);
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🌍 Seus Países</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <Button
            type="submit"
            fullWidth
            loading={loading}
            style={{ marginBottom: '10px' }}
          >
            Entrar
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onRegister}
          >
            Criar Conta
          </Button>
        </form>
      </div>
    </div>
  );
}
