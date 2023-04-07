import { setMonth, setYear } from '../actions/yearMonth'
import { useAppDispatch, useAppSelector } from '../hooks'

function DateSelectForm() {
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const dispatch = useAppDispatch()

  // Handle year change
  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setYear(event.target.value))
  }

  // Handle month change
  function handleMonthChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setMonth(event.target.value))
  }

  return (
    <form>
      <label htmlFor="year">
        Year:
        <select id="year" name="year" value={year} onChange={handleYearChange}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </label>
      <label htmlFor="month">
        Month:
        <select
          id="month"
          name="month"
          value={month}
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
