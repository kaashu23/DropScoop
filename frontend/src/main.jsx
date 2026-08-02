import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', background: 'black', minHeight: '100vh' }}>
          <h1>React Crashed!</h1>
          <pre>{this.state.error?.stack || this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const isInvalidKey = PUBLISHABLE_KEY === 'pk_test_...';

if (!PUBLISHABLE_KEY || isInvalidKey) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', background: '#fdfbf7', minHeight: '100vh' }}>
      <h1 style={{ color: '#4a3531', fontSize: '2rem', margin: '0 0 1rem 0' }}>Configuration Error</h1>
      <p style={{ color: '#8c7875', fontSize: '1.2rem', margin: '0 0 2rem 0' }}>
        The <code>VITE_CLERK_PUBLISHABLE_KEY</code> is missing from your build environment.
      </p>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', display: 'inline-block', textAlign: 'left', border: '1px solid #eee', boxShadow: '0 10px 40px -10px rgba(74,53,49,0.1)' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#4a3531' }}>How to fix this:</h3>
        <ol style={{ margin: 0, padding: '0 0 0 20px', color: '#5c433e', lineHeight: 1.6 }}>
          <li>Go to your <strong>Netlify Dashboard</strong></li>
          <li>Click on <strong>Site configuration</strong> → <strong>Environment variables</strong></li>
          <li>Add a new variable: <code>VITE_CLERK_PUBLISHABLE_KEY</code> and paste your key.</li>
          <li><strong>CRITICAL:</strong> Go to the <strong>Deploys</strong> tab.</li>
          <li>Click <strong>Trigger deploy</strong> → <strong>Clear cache and deploy site</strong>.</li>
        </ol>
      </div>
    </div>
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ClerkProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
