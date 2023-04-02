import { useAuth0 } from '@auth0/auth0-react'

function Logoff() {
  const { logout } = useAuth0()

  function handleSignOut() {
    logout()
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}

export default Logoff
