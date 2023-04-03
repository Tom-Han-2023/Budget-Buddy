import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchBudgets } from '../actions/budgets'

import { useAppDispatch } from '../hooks'
import { RootState } from '../store'

interface Prop {
  setMonth: React.Dispatch<React.SetStateAction<string>>
  setYear: React.Dispatch<React.SetStateAction<string>>
  year: string
  month: string
}

function DateSelectForm(prop: Prop) {
  // Handle year change
  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    prop.setYear(event.target.value)
  }

  // Handle month change
  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    prop.setMonth(event.target.value)
  }

  return (
    <form>
      <label htmlFor="year">
        Year:
        <select
          id="year"
          name="year"
          value={prop.year}
          onChange={handleYearChange}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </label>
      <label htmlFor="month">
        Month:
        <select
          id="month"
          name="month"
          value={prop.month}
          onChange={handleMonthChange}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </label>
    </form>
  )
}

export default DateSelectForm
