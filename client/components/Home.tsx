import { useAuth0 } from '@auth0/auth0-react'

function Home() {
  const { loginWithRedirect } = useAuth0()
  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <>
      <h1>Please sign in to use the app</h1>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  )
}
export default Home
