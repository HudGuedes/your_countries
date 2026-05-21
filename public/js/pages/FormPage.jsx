function FormPage({ country, onBack }) {
  const { useState } = React;
  const [form, setForm] = useState(country || {
    name: '',
    capital: '',
    region: '',
    population: '',
    code: '',
    flag: ''
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      if (country) {
        await customCountriesService.update(country.id, form);
      } else {
        await customCountriesService.create(form);
      }
      alert('Salvo com sucesso!');
      onBack();
    } catch (err) {
      alert('Erro: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
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
          <h2 style={{ marginBottom: '20px' }}>
            {country ? 'Editar' : 'Criar'} País
          </h2>

          <form onSubmit={handleSubmit}>
            <Input
              label="Nome:"
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
            <Input
              label="Capital:"
              type="text"
              value={form.capital}
              onChange={(e) => updateField('capital', e.target.value)}
            />
            <Input
              label="Região:"
              type="text"
              value={form.region}
              onChange={(e) => updateField('region', e.target.value)}
              required
            />
            <Input
              label="População:"
              type="number"
              value={form.population}
              onChange={(e) => updateField('population', e.target.value)}
            />
            <Input
              label="Código (3 letras):"
              type="text"
              value={form.code}
              onChange={(e) => updateField('code', e.target.value.toUpperCase())}
              required
              maxLength={3}
            />
            <Input
              label="URL da Bandeira:"
              type="url"
              value={form.flag}
              onChange={(e) => updateField('flag', e.target.value)}
            />
            <Button type="submit" fullWidth loading={saving}>
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
