import { createRoot } from 'react-dom/client'
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
        domain="railway-budget-buddy.au.auth0.com"
        clientId="y6jKbXEJjWFqzGgVczBSveWyuDISbQkR"
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
