import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'

function Home() {
  const { loginWithRedirect } = useAuth0()
  function handleSignIn() {
    loginWithRedirect()
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 100,
          fontSize: '2.2rem',
        }}
      >
        <h1>Welcome to Budget Buddy</h1>
        <Button
          onClick={handleSignIn}
          variant="outlined"
          startIcon={<LoginIcon />}
        >
          Get Started
        </Button>
        <img src="/Image/app-page.png" alt="Look of App page"></img>
        <p>
          Take control of your finances and start achieving your financial goals
          with Budget Buddy.
        </p>
        <p>
          {`Our app allows you to easily create and manage budgets for all aspects
          of your life, whether it's for groceries, entertainment, or rent.`}
        </p>
        <p>With Budget Buddy, you can:</p>
        <ul>
          <li>Set up multiple budgets for different categories</li>
          <li>Track your spending and stay within your budget</li>
          <li>{`Receive alerts when you're approaching your spending limit`}</li>
          <li>
            See your spending history and identify areas where you can save
            money
          </li>
        </ul>
        <Button
          onClick={handleSignIn}
          variant="outlined"
          startIcon={<LoginIcon />}
        >
          Get Started
        </Button>
      </div>
    </>
  )
}
export default Home
