import React from 'react';
import { dayjs, daysOfWeek, months } from '../util';

export default function CustomCalendar() {
  const j = new Date();
  console.log(dayjs().startOf('M').day());
  console.log(dayjs().daysInMonth());
  const year = dayjs().year();
  const month = months[dayjs().month() + 1];

  const daysOfMonthArr = [];
  for (let i = 0; i < dayjs().startOf('M').day(); i++) {
    daysOfMonthArr.push(null);
  }
  for (let i = 1; i <= dayjs().daysInMonth(); i++) {
    daysOfMonthArr.push(i);
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
      <div style={{ display: 'inline-block' }}>
        {month} {year}
      </div>
      <div style={{ display: 'flex' }}>
        {daysOfWeek.map((day, index) => {
          return (
            <div key={index} style={cellStyle}>
              {day}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
        {daysOfMonthArr.map((day, i) => {
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
