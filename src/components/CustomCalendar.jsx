import React from 'react';
import { dayjs, daysOfWeek, months } from '../util';

export default function CustomCalendar({
  currentPointer,
  setCurrentPointer,
  currentPage,
}) {
  const { year, month } = currentPage;

  const TOTAL_CELLS = 42;

  const daysOfMonthArr = [];
  for (
    let i = 0;
    i <
    dayjs(`${year}-${month + 1}-01`)
      .startOf('M')
      .day();
    i++
  ) {
    daysOfMonthArr.push(null);
  }
  for (let i = 1; i <= dayjs(`${year}-${month + 1}-01`).daysInMonth(); i++) {
    daysOfMonthArr.push(i);
  }

  for (let i = daysOfMonthArr.length; i < TOTAL_CELLS; i++) {
    daysOfMonthArr.push(null);
  }

  const cellStyle = {
    height: '40px',
    width: '36px',
    margin: '0 2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '0.75rem',
  };

  return (
    <div
      style={{
        margin: '8px',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        paddingTop: '8px',
      }}
    >
      {/* headers of month & year  */}
      <div style={{ display: 'inline-block' }}>
        {months[month]} {year}
      </div>

      {/* Abbrs of days of week  */}
      <div style={{ display: 'flex', borderright: '1px solid grey' }}>
        {daysOfWeek.map((day, index) => {
          return (
            <div key={index} style={cellStyle}>
              {day}
            </div>
          );
        })}
      </div>

      {/* grid for days in the month  */}
      <div
        style={{
          display: 'grid',
          borderRight: '1px solid grey',
          gridTemplateColumns: 'repeat(7,1fr)',
        }}
      >
        {daysOfMonthArr.map((day, i) => {
          const currentCell = {
            year: year,
            month: month,
            day: day,
          };
          if (isMatched(currentCell, currentPointer)) {
            return (
              <div
                key={i}
                style={{
                  ...cellStyle,
                  backgroundColor: 'blue',
                  color: 'white',
                }}
              >
                {day}
              </div>
            );
          }
          return (
            <div key={i} style={cellStyle}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const isMatched = (currentCell, currentPointer) => {
  return (
    currentCell.year === currentPointer.year &&
    currentCell.month === currentPointer.month &&
    currentCell.day === currentPointer.day
  );
};
