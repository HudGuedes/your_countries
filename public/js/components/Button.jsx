function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  style
}) {
  const className = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}
