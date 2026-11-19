import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Render Error Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF3E2',
          padding: '2rem',
          fontFamily: "'Inter', system-ui, sans-serif"
        }}>
          <div style={{
            background: '#ffffff',
            border: '4px solid #111111',
            boxShadow: '8px 8px 0px #111111',
            padding: '2.5rem',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center'
          }}>
            <img src="/logo.png" alt="Strivers" width="160" height="45" style={{ marginBottom: '1.5rem', display: 'inline-block' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem', color: '#111111' }}>
              Oops! Something went wrong.
            </h2>
            <p style={{ color: '#4a4a4a', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              The page encountered an unexpected rendering issue. Click below to reload.
            </p>
            <button
              onClick={() => {
                try { localStorage.clear(); } catch {}
                window.location.reload();
              }}
              style={{
                background: '#FF3B00',
                color: '#ffffff',
                border: '3px solid #111111',
                boxShadow: '4px 4px 0px #111111',
                padding: '0.75rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
