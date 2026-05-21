function CountryCard({ country, onView, onEdit, onDelete }) {
  const isCustom = country.source === 'custom';

  return (
    <div className={`country-card ${isCustom ? 'custom' : ''}`}>
      {isCustom && <span className="custom-badge">MEU PAÍS</span>}

      <img
        src={country.flag || 'https://via.placeholder.com/280x160?text=No+Flag'}
        alt={country.name}
        className="flag"
      />

      <h3>{country.name}</h3>
      <p>Capital: {country.capital || 'N/A'}</p>
      <p>Região: {country.region}</p>
      <p>População: {(country.population || 0).toLocaleString()}</p>

      {isCustom ? (
        <div className="country-actions">
          <Button variant="primary" onClick={() => onView(country)}>Ver</Button>
          <Button variant="primary" onClick={() => onEdit(country)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(country.id)}>Deletar</Button>
        </div>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onClick={() => onView(country)}
          style={{ marginTop: '15px' }}
        >
          Ver Detalhes
        </Button>
      )}
    </div>
  );
}
