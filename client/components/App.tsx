import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Budget from './Budget'
import Expenses from './Expenses'
import Home from './Home'
import Logoff from './LogOff'

function App() {
  return (
    <div>
      <header>
        <h1>Budgeting App</h1>
      </header>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
      <IfAuthenticated>
        <Budget />
        <Expenses />
        <Logoff />
      </IfAuthenticated>
      <footer>
        <h2>Made by Tom Han</h2>
      </footer>
    </div>
  )
}

export default App
