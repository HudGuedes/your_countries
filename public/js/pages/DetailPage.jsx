function DetailPage({ country, onBack }) {
  return (
    <div className="container">
      <Button
        variant="secondary"
        onClick={onBack}
        style={{ marginBottom: '20px' }}
      >
        ← Voltar
      </Button>

      <div className="detail-card">
        <img
          src={country.flag}
          alt={country.name}
          className="detail-flag"
        />
        <h1>{country.name}</h1>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Região:</strong> {country.region}</p>
        <p><strong>População:</strong> {(country.population || 0).toLocaleString()}</p>
        <p><strong>Código:</strong> {country.code}</p>
        {country.currencies && country.currencies.length > 0 && (
          <p>
            <strong>Moedas:</strong> {country.currencies.map(c => `${c.name} (${c.symbol})`).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
