import { useState } from 'react';
import './App.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';
import CustomCalendarContainer from './components/CustomCalendarContainer';

function App() {
  const [muiValue, setMuiValue] = useState('mui-flex-row');

  const handleMuiCalendarChange = (e) => {
    setMuiValue(e.target.name);
    console.log(e.target.name);
  };

  return (
    <div
      style={{
        width: 'inherit',
        height: 'inherit',
        border: '1px solid black',
        padding: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap',
        rowGap: '1rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>my custom calendar</h3>

        <CustomCalendarContainer />
      </Paper>

      <Paper
        elevation={3}
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <h3>Mui Date Range Calendar</h3>

        <FormControl
          sx={{
            '& .MuiFormGroup-root': { flexFlow: 'row', columnGap: '1rem' },
          }}
        >
          <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={muiValue}
            onChange={handleMuiCalendarChange}
          >
            <FormControlLabel
              name="mui-flex-row"
              value="mui-flex-row"
              control={<Radio />}
              label="Flex:row"
            />
            <FormControlLabel
              name="mui-flex-column"
              value="mui-flex-column"
              control={<Radio />}
              label="Flex:column"
            />
            <FormControlLabel
              name="mui-grid"
              value="mui-grid"
              control={<Radio />}
              label="Grid"
            />
          </RadioGroup>
        </FormControl>

        <DemoContainer
          components={['DateRangeCalendar']}
          sx={{ alignItems: 'center' }}
        >
          <DateRangeCalendar
            calendars={3}
            sx={
              muiValue === 'mui-flex-row'
                ? { flexFlow: 'row' }
                : muiValue === 'mui-flex-column'
                ? { flexFlow: 'column' }
                : {
                    display: 'grid',
                    width: '100%',
                    height: '100%',
                    gridTemplateColumns: '1fr 1fr',
                  }
            }
          />
        </DemoContainer>
      </Paper>
    </div>
  );
}

export default App;
