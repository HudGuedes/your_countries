function RegisterPage({ onAuth, onBack }) {
  const { useState } = React;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('Senhas não conferem');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await authService.register(email, password, passwordConfirm);
      if (data.success) {
        onAuth(data.user);
      } else {
        setError(data.errors ? data.errors.join(', ') : 'Erro ao criar conta');
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
        <h1 className="login-title">Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha (mín. 8 caracteres):"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Input
            label="Confirmar Senha:"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            minLength={8}
          />
          {error && <div className="error">{error}</div>}
          <Button
            type="submit"
            variant="success"
            fullWidth
            loading={loading}
            style={{ marginBottom: '10px' }}
          >
            Criar Conta
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onBack}
          >
            Voltar
          </Button>
        </form>
      </div>
    </div>
  );
}
