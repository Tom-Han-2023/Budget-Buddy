import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="tohora-2023-tom.au.auth0.com"
      clientId="62vukZWmZHUa7X7jAhvF1mPxf3Hg6Tz1"
          >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  )
})
