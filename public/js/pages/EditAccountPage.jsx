function EditAccountPage({ user, onBack, onUpdate }) {
  const { useState } = React;
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não conferem');
      return;
    }

    setSaving(true);

    try {
      const data = await userService.update(email, newPassword, confirmPassword);
      if (data.success) {
        setSuccess('Conta atualizada com sucesso!');
        onUpdate(data.user);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => onBack(), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const password = prompt('Digite sua senha para confirmar a exclusão da conta:');
    if (!password) return;

    if (!confirm('TEM CERTEZA que deseja DELETAR sua conta? Esta ação é IRREVERSÍVEL!')) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      await userService.delete(password);
      alert('Conta deletada com sucesso!');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <Button
          variant="secondary"
          onClick={onBack}
          style={{ marginBottom: '20px' }}
        >
          ← Voltar
        </Button>

        <div className="form-card">
          <h2 style={{ marginBottom: '20px' }}>Editar Conta</h2>

          <form onSubmit={handleUpdate}>
            <Input
              label="Email:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Nova Senha:"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              placeholder="Mínimo 8 caracteres"
              required
            />
            <Input
              label="Confirme a Nova Senha:"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />

            {error && <div className="error" style={{ marginBottom: '15px' }}>{error}</div>}
            {success && <div className="success" style={{ marginBottom: '15px' }}>{success}</div>}

            <Button
              type="button"
              variant="danger"
              fullWidth
              onClick={handleDelete}
              disabled={saving}
              style={{ marginBottom: '10px' }}
            >
              Deletar Conta
            </Button>

            <Button type="submit" fullWidth loading={saving}>
              Atualizar Conta
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
