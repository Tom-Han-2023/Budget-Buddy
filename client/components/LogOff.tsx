import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'

function Logoff() {
  const { logout, user } = useAuth0()

  function handleSignOut() {
    logout()
  }

  return (
    <div style={{ padding: 10 }}>
      <h2>Welcome {user?.name}</h2>
      <Button
        onClick={handleSignOut}
        variant="outlined"
        startIcon={<LogoutIcon />}
      >
        Log Off
      </Button>
    </div>
  )
}

export default Logoff
