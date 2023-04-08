import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '../hooks'

ChartJS.register(ArcElement, Tooltip, Legend)

function PieChart() {
  const expenses = useAppSelector((state) => state.expenses)

  const listOfAllExpenses = expenses.data.map((expenses) => expenses)
  const budgetNames = listOfAllExpenses.reduce((names: string[], expense) => {
    if (!names.includes(expense.budgetName)) {
      names.push(expense.budgetName)
    }
    return names
  }, [])

  const data = budgetNames.map((budgetName) => {
    const totalSpending = listOfAllExpenses
      .filter((expense) => expense.budgetName === budgetName)
      .reduce((sum, expense) => sum + expense.amount, 0)
    return {
      label: budgetName,
      value: totalSpending,
    }
  })
 

  

  const chartData = {
    labels: data.map((budget) => budget.label),
    datasets: [
      {
        label: 'Total Spending by Budget $',
        data: data.map((budget) => budget.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 0, 0, 0.6)',
          'rgba(0, 255, 0, 0.6)',
          'rgba(0, 0, 255, 0.6)',
          'rgba(255, 255, 0, 0.6)',
          'rgba(255, 0, 255, 0.6)',
          'rgba(0, 255, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(0, 255, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return <Doughnut data={chartData} redraw={true} />
}

export default PieChart
