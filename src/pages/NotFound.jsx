import { Button } from '../components/ui/Button.jsx';
import Navbar from '../components/Navbar.jsx';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
      }}>
        {/* Issue number — editorial feel */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-ink-faint)', marginBottom: '1.5rem',
        }}>Error 404 — Page Not Found</p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.25rem, 7vw, 4.5rem)',
          fontWeight: 500, lineHeight: 1.1,
          color: 'var(--color-ink)',
          maxWidth: '16ch', marginBottom: '1.25rem',
        }}>
          This page ghosted harder than your last study group.
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
          color: 'var(--color-ink-muted)', lineHeight: 1.7,
          maxWidth: '36ch', marginBottom: '0.5rem',
        }}>
          It moved. Or never existed. Either way, this isn&rsquo;t helping your rank.
        </p>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
          color: 'var(--color-ink-faint)', marginBottom: '2.5rem',
        }}>
          Unlike your syllabus, we won&rsquo;t make you re-read this page.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button href="/" variant="primary" id="404-home-btn">Back to Home</Button>
          <Button href="/#courses" variant="ghost" id="404-courses-btn">Browse Courses</Button>
        </div>

        {/* Decorative 404 in large serif */}
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(5rem,18vw,12rem)',
          fontWeight: 500, lineHeight: 1,
          color: 'var(--color-border)',
          marginTop: '4rem', letterSpacing: '-0.04em',
          userSelect: 'none', pointerEvents: 'none',
        }}>404</p>
      </div>
    </div>
  );
}
