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

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const isInvalidKey = PUBLISHABLE_KEY === 'pk_test_...';

if (isInvalidKey) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', background: '#fdfbf7', minHeight: '100vh' }}>
      <h1 style={{ color: '#4a3531', fontSize: '2rem', marginBottom: '1rem' }}>Clerk Authentication Setup Required</h1>
      <p style={{ color: '#8c7875', fontSize: '1.2rem', marginBottom: '2rem' }}>
        You need to add your real Clerk Publishable Key to your <code>frontend/.env</code> file to run the app.
      </p>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', display: 'inline-block', textAlign: 'left', border: '1px solid #ccc' }}>
        <p>1. Go to <a href="https://dashboard.clerk.com" target="_blank" style={{ color: 'blue' }}>Clerk Dashboard</a></p>
        <p>2. Copy your <strong>Publishable Key</strong></p>
        <p>3. Open <code>frontend/.env</code></p>
        <p>4. Replace <code>VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code> with your real key.</p>
        <p>5. Restart your Vite development server.</p>
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
