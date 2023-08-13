import React, { useState } from 'react';
import CustomCalendar from './CustomCalendar';
import { dayjs } from '../util';

export default function CustomCalendarContainer({ numOfCalendars, styles }) {
  const [currentPointer, setCurrentPointer] = useState({
    year: dayjs().year(),
    month: dayjs().month(),
    day: dayjs().get('D'),
  });

  // console.log(dayjs('2023-08-01').startOf('M').daysInMonth());

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

      {Array.from({ length: numOfCalendars }, (_, index) => {
        const currentPage = {
          year: currentPointer.year,
          month: currentPointer.month + index,
        };

        // we are only dealing with normal cases, not some edge cases, such as
        // when currentPage.month is 34, or even bigger, because we have not applied
        // limitation on the `numsOfCalendars`.
        if (currentPage.month > 11) {
          currentPage.month = currentPage.month - 12;
          currentPage.year = currentPage.year + 1;
        }

        return (
          <CustomCalendar
            key={index}
            currentPointer={currentPointer}
            setCurrentPointer={setCurrentPointer}
            currentPage={currentPage}
          />
        );
      })}
    </div>
  );
}
