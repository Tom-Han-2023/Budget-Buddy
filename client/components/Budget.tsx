import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { fetchBudgets } from '../actions/budgets'
import { setAccessToken } from '../actions/token'
import { setMonth, setYear } from '../actions/yearMonth'
import { useAppDispatch, useAppSelector } from '../hooks'
import AddBudget from './AddBudget'
import DeleteBudget from './DeleteBudget'
import UpdateBudget from './UpdateBudget'
import { Grid, LinearProgress } from '@mui/material'
import { grey } from '@mui/material/colors'

function Budget() {
  const { getAccessTokenSilently } = useAuth0()
  const budgets = useAppSelector((state) => state.budgets)
  const { accessToken } = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const expenses = useAppSelector((state) => state.expenses)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear().toString()
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    })
    dispatch(setMonth(currentMonth))
    dispatch(setYear(currentYear))
  }, [dispatch])

  useEffect(() => {
    if (accessToken === null) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://budgets/api',
        },
      })
        .then((token) => {
          dispatch(setAccessToken(token))
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      dispatch(fetchBudgets(accessToken, year, month))
    }
  }, [dispatch, accessToken, getAccessTokenSilently, year, month])

  function calculateTotalSpent(budgetId: number) {
    const expensesByBudgetId = expenses.data.filter((expense) => {
      return expense.budget_id === budgetId
    })
    const totalSpent = expensesByBudgetId.reduce((sum, curr) => {
      return sum + curr.amount
    }, 0)
    return totalSpent
  }

  if (budgets.isLoading) {
    return (
      <div>
        <h1>page is loading</h1>
      </div>
    )
  }

  if (budgets.error) {
    return <div>{budgets.error}</div>
  }

  return (
    <>
      <div>
        <Grid
          direction="row"
          container
          spacing={1}
          sx={{
            minHeight: '30rem',
            minWidth: '30rem',
            overflowY: 'auto',
            maxWidth: '40rem',
            maxHeight: '40rem',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: 'white',
                borderRadius: '5px',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h1>Add New Budget</h1>
              <AddBudget />
            </div>
          </Grid>
          {budgets.data.map((budget) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={budget.id}
                sx={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                  margin: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div key={budget.id}>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {budget.name}
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Amount Allocated: ${budget.amount}
                  </p>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Total Spent this month: ${calculateTotalSpent(budget.id)}
                  </p>
                  <LinearProgress
                    variant="determinate"
                    value={
                      calculateTotalSpent(budget.id) > budget.amount
                        ? 100
                        : (calculateTotalSpent(budget.id) / budget.amount) * 100
                    }
                    color={
                      calculateTotalSpent(budget.id) <= budget.amount / 2
                        ? 'success'
                        : calculateTotalSpent(budget.id) <= budget.amount * 0.75
                        ? 'warning'
                        : 'error'
                    }
                    sx={{
                      height: '8px',
                      borderRadius: '4px',
                      mt: '1rem',
                      mb: '1rem',
                      bgcolor: grey[300],
                    }}
                  />
                  <DeleteBudget budgetid={budget.id} />
                  <UpdateBudget
                    budgetAmount={budget.amount}
                    budgetName={budget.name}
                    budgetid={budget.id}
                  />
                </div>
              </Grid>
            )
          })}
          {budgets.data.length < 4 && (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                  margin: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    PlaceHolder1
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Amount Allocated: $0
                  </p>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Total Spent this month: $0
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                  margin: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    PlaceHolder1
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Amount Allocated: $0
                  </p>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Total Spent this month: $0
                  </p>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                  margin: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    PlaceHolder1
                  </h2>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Amount Allocated: $0
                  </p>
                  <p style={{ fontSize: '1rem', color: 'grey.600' }}>
                    Total Spent this month: $0
                  </p>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </>
  )
}

export default Budget
