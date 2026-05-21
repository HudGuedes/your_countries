function HomePage({ user, onView, onEdit, onCreate, onEditAccount }) {
  const { useState, useEffect, useRef } = React;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const itemsPerPage = 24;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadCountries(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  async function loadCountries(page, searchTerm) {
    if (searchTerm !== debouncedSearch) {
      setSearching(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await countriesService.getAll(page, itemsPerPage, searchTerm);
      setCountries(response.countries);
      setPagination(response.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }

  async function handleLogout() {
    try {
      await authService.logout();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja deletar este país?')) return;

    try {
      await customCountriesService.delete(id);
      loadCountries(currentPage, search);
    } catch (err) {
      alert('Erro ao deletar: ' + err.message);
    }
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const totalPages = pagination ? pagination.total_pages : 1;
  const totalCount = pagination ? pagination.total_count : 0;

  if (loading && countries.length === 0) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>🌍 Seus Países</h1>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <Button variant="success" onClick={onCreate}>+ Criar País</Button>
          <Button variant="primary" onClick={onEditAccount}>Editar Conta</Button>
          <Button variant="secondary" onClick={handleLogout}>Sair</Button>
        </div>
      </div>

      <div className="container">
        <input
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />

        <div className="page-info">
          Total: {totalCount} países | Página {currentPage} de {totalPages}
          {(loading || searching) && <span style={{ marginLeft: '10px', color: '#666' }}> Carregando...</span>}
        </div>

        <div className="countries-grid" style={{ opacity: (loading || searching) ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {countries.map((country, idx) => (
            <CountryCard
              key={country.id || idx}
              country={country}
              onView={onView}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
          onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        />
      </div>
    </div>
  );
}
