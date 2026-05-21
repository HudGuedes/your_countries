function Input({ label, error, ...props }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input className={error ? 'input-error' : ''} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
