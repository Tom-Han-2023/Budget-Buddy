import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import App from './components/App'
import store from './store'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Auth0Provider
        domain="tohora-2023-tom.au.auth0.com"
        clientId="UeVfLKLFdM4sD3X4fVL5dY5cjE3yrr6Z" //production: vVLt7WpBJPn0MBh2SDiNQky0wvcleb9t // development:UeVfLKLFdM4sD3X4fVL5dY5cjE3yrr6Z
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'https://budgets/api',
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </LocalizationProvider>
  )
})
