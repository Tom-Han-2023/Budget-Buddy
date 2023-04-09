import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Budget from './Budget'
import DateSelectForm from './DateSelectForm'
import Expenses from './Expenses'
import Home from './Home'
import Logoff from './LogOff'
import PieChart from './PieChart'
import Total from './Total'

function App() {
  return (
    <div>
      <header style={{ marginTop: 20, marginLeft: 20 }}>
        <h1>Budget Buddy</h1>
      </header>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
      <IfAuthenticated>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DateSelectForm />
          <Logoff />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <PieChart />
          <Budget />
          <Total />
        </div>
        <div>
          <Expenses />
        </div>
      </IfAuthenticated>
      <footer>
        <h2 style={{ textAlign: 'center' }}>Made by Tom Han</h2>
      </footer>
    </div>
  )
}

export default App
