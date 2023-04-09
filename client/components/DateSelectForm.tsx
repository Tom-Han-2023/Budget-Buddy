import { setMonth, setYear } from '../actions/yearMonth'
import { useAppDispatch, useAppSelector } from '../hooks'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

function DateSelectForm() {
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const dispatch = useAppDispatch()

  // Handle year change
  function handleYearChange(event: SelectChangeEvent<string>) {
    dispatch(setYear(event.target.value))
  }

  // Handle month change
  function handleMonthChange(event: SelectChangeEvent<string>) {
    dispatch(setMonth(event.target.value))
  }

  return (
    <div style={{ padding: 50 }}>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor={'label-for-year'} id={'label-for-year'}>
          Year
        </InputLabel>
        <Select
          inputProps={{ id: 'label-for-year' }}
          labelId={'label-for-year'}
          value={year}
          id={'category-select'}
          label={'Year'}
          onChange={(e) => handleYearChange(e)}
        >
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2025">2025</MenuItem>
        </Select>
      </FormControl>
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor={'label-for-month'} id="Month">
          Month
        </InputLabel>
        <Select
          inputProps={{ id: 'label-for-month' }}
          labelId={'label-for-month'}
          value={month}
          label={'Month'}
          onChange={(e) => {
            handleMonthChange(e)
          }}
        >
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default DateSelectForm
