export function Button({ href, children, variant = 'primary', id, onClick, className, style: customStyle }) {
  const base = {
    display: 'inline-block',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.03em',
    textDecoration: 'none',
    cursor: 'pointer',
    border: '1px solid transparent',
    padding: '0.625rem 1.25rem',
    lineHeight: 1,
    transition: 'background 0.18s, color 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s',
  };

  const variants = {
    primary: {
      background: 'var(--color-accent)',
      color: '#fff',
      borderColor: 'var(--color-accent)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-ink)',
      borderColor: 'var(--color-border-strong)',
    },
    dark: {
      background: 'var(--color-ink)',
      color: 'var(--color-paper)',
      borderColor: 'var(--color-ink)',
    },
  };

  const style = { ...base, ...variants[variant], ...customStyle };

  const hoverEnter = (e) => {
    if (variant === 'primary') {
      e.currentTarget.style.background = 'var(--color-accent-dark)';
      e.currentTarget.style.borderColor = 'var(--color-accent-dark)';
    } else if (variant === 'ghost') {
      e.currentTarget.style.background = 'rgba(26,26,26,0.05)';
    } else if (variant === 'dark') {
      e.currentTarget.style.background = '#2d2d2d';
    }
  };
  const hoverLeave = (e) => {
    Object.assign(e.currentTarget.style, variants[variant]);
    if (customStyle) {
      Object.assign(e.currentTarget.style, customStyle);
    }
  };

  if (onClick) {
    return (
      <button id={id} className={className} style={style} onClick={onClick} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
        {children}
      </button>
    );
  }

  return (
    <a id={id} href={href || '#'} className={className} style={style} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
      {children}
    </a>
  );
}
