import React, { useEffect } from 'react';
import { dayjs, daysOfWeek, months } from '../util';
import * as styles from './CustomCalendar.module.css';

const TOTAL_CELLS = 42;
const daysOfWeekStyles = {
  height: '40px',
  width: '36px',
  padding: '0 2px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  fontSize: '0.75rem',
};

export default function CustomCalendar({
  currentPointer,
  setCurrentPointer,
  currentPage,
}) {
  const { year, month } = currentPage;

  const daysOfMonthArr = generateDaysOfMonthArray(year, month);

  const handleClick = (day) => (e) => {
    console.log('year, month, day: ', year, month, day);
    const newPointer = {
      year: year,
      month: month,
      day: day,
    };
    setCurrentPointer(newPointer);
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
      <div style={{ display: 'flex' }}>
        {daysOfWeek.map((day, index) => {
          return (
            <div key={index} style={daysOfWeekStyles}>
              {day}
            </div>
          );
        })}
      </div>

      {/* grid for days in the month  */}
      <div
        style={{
          display: 'grid',
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
                className={styles.cellStyles}
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                }}
              >
                {day}
              </div>
            );
          }
          return (
            <div
              onClick={day !== null ? handleClick(day) : undefined}
              key={i}
              className={
                day !== null ? `${styles.cellStyles}` : `${styles.blank}`
              }
            >
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

const generateDaysOfMonthArray = (year, month) => {
  const arr = [];
  for (
    let i = 0;
    i <
    dayjs(`${year}-${month + 1}-01`)
      .startOf('M')
      .day();
    i++
  ) {
    arr.push(null);
  }
  for (let i = 1; i <= dayjs(`${year}-${month + 1}-01`).daysInMonth(); i++) {
    arr.push(i);
  }

  for (let i = arr.length; i < TOTAL_CELLS; i++) {
    arr.push(null);
  }
  return arr;
};
