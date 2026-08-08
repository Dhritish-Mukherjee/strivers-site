// SectionHeading — serif display heading with optional accent marker
export function SectionHeading({ label, title, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {label && (
        <span
          className="text-[var(--color-accent)] text-xs font-medium tracking-[0.15em] uppercase font-sans block mb-3"
        >
          {label}
        </span>
      )}
      <h2
        className="font-serif text-4xl md:text-5xl font-medium leading-tight text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {title}
      </h2>
    </div>
  );
}
