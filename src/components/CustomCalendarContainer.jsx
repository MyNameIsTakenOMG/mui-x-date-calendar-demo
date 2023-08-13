import React from 'react';
import CustomCalendar from './CustomCalendar';

export default function CustomCalendarContainer({ numOfCalendars, styles }) {
  return (
    <div
      style={{ border: '1px solid red', position: 'relative', display: 'flex' }}
    >
      <button style={{ position: 'absolute', top: 0, left: 0, padding: '8px' }}>
        {'<'}
      </button>
      <button
        style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}
      >
        {'>'}
      </button>
      <CustomCalendar />
      <CustomCalendar />
    </div>
  );
}
