function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        ← Anterior
      </Button>

      <span className="pagination-info">
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="secondary"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Próxima →
      </Button>
    </div>
  );
}
