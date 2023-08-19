import React, { useCallback, useState } from 'react';
import CustomCalendar from './CustomCalendar';
import { dayjs } from '../util';

const styling = {
  'custom-flex-row': { display: 'flex', flexFlow: 'row' },
  'custom-flex-column': { display: 'flex', flexFlow: 'column' },
  'custom-grid': {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: '1fr 1fr',
  },
};
export default function CustomCalendarContainer({ numOfCalendars, styles }) {
  // the coordinates of the pointer in the calendar
  const [currentPointer, setCurrentPointer] = useState({
    year: dayjs().year(),
    month: dayjs().month(), // 0 - 11
    day: dayjs().get('D'),
  });

  // use to render calendars correctly
  const [basePosition, setBasePosition] = useState({
    year: dayjs().year(),
    month: dayjs().month(), // 0 - 11
  });

  // calendars array
  const calendars = useCallback(() => {
    return Array.from({ length: numOfCalendars }, (_, index) => {
      const currentPage = {
        year: basePosition.year,
        month: basePosition.month + index,
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
    });
  }, [basePosition.month, currentPointer]);

  const goBackward = () => {
    if (basePosition.month - numOfCalendars < 0) {
      setBasePosition((pre) => {
        return {
          year: pre.year - 1,
          month: 12 + pre.month - numOfCalendars,
        };
      });
    }
    setBasePosition((pre) => {
      return {
        year: pre.year,
        month: pre.month - numOfCalendars,
      };
    });
  };
  const goForward = () => {
    if (basePosition.month + numOfCalendars > 11) {
      setBasePosition((pre) => {
        return {
          year: pre.year + 1,
          month: numOfCalendars - (12 - pre.month),
        };
      });
    }
    setBasePosition((pre) => {
      return {
        year: pre.year,
        month: pre.month + numOfCalendars,
      };
    });
  };

  return (
    <div
      style={{
        border: '1px solid red',
        position: 'relative',
        ...styling[styles],
      }}
    >
      <button
        onClick={goBackward}
        style={{ position: 'absolute', top: 0, left: 0, padding: '8px' }}
      >
        {'<'}
      </button>
      <button
        onClick={goForward}
        style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}
      >
        {'>'}
      </button>

      {/* calendar arrays  */}
      {calendars()}
    </div>
  );
}
