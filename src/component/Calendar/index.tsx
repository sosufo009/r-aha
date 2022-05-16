import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';

const CURRENT_YEAR = +new Date().getFullYear();
const CURRENT_MONTH = +new Date().getMonth() + 1;
const WEEK_DAYS = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
};
// Calendar months names and short names
const CALENDAR_MONTHS = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December',
};
// Weeks displayed on calendar
const CALENDAR_WEEKS = 6;
const zeroPad = (value: number, length: number) => `${value}`.padStart(length, '0');
const getMonthDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
      ? 30
      : 31;
};
const getMonthFirstDay = (month = CURRENT_MONTH, year = CURRENT_YEAR) => +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;

const isDate = (date: Date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

const isSameMonth = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

const isSameDay = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;
  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +basedateDate === +dateDate
    && +basedateMonth === +dateMonth
    && +basedateYear === +dateYear
  );
};

const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;
  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2),
  ].join('-');
};

const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};

const calendar = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  // Get number of days in the month and the month's first day

  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);
  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  // Get the previous and next months and years

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year,
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
  // Builds dates to be displayed from previous month

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });
  // Builds dates to be displayed from current month

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });
  // Builds dates to be displayed from next month

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });
  // Combines all dates from previous, current and next months

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export default function CalendarComponent({ date }) {
  const [dateState, setDateState] = useState<{ current: Date | undefined, month: number, year: number }>({
    current: new Date(),
    month: 0,
    year: 0,
  });
  const [calType, setCalType] = useState<'month' | 'year'>('month');
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    addDateToState(date);
  }, []);

  const addDateToState = (date: Date) => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    setDateState({
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    });
  };
  const getCalendarDates = () => {
    const { current, month, year } = dateState;

    const calendarMonth = month || +current?.getMonth() + 1;

    const calendarYear = year || current?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  };

  const renderMonthAndYear = () => {
    const { month, year } = dateState;

    const monthname = Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
    return (
      <div className="">
        <div className="flex flex-col mx-[12px] my-[17px]">
          <div>
            Text
          </div>
          <div className="text-3xl font-bold">
            {monthname.substring(0, 3)}
            ,
            {year}
          </div>
        </div>
        <div className="flex justify-between mb-[26px]">
          <div
            onClick={handlePrevious}
            title="Previous Month"
          >
            <ArrowBackIosNewOutlined sx={{ fontSize: '12px' }} />
          </div>
          <div className="text-[16px]" onClick={handleChangeYear}>
            {calType === 'month' && monthname}
            {' '}
            {year}
          </div>
          <div
            onClick={handleNext}
            title="Next Month"
          >
            <ArrowForwardIosOutlined sx={{ fontSize: '12px' }} />
          </div>
        </div>
      </div>
    );
  };

  const renderDayLabel = (day: string) => {
    const daylabel = WEEK_DAYS[day];
    return (
      <div className="w-[36px] text-[11px] flex justify-center items-center text-sm text-gray-500" key={daylabel}>
        {daylabel}
      </div>
    );
  };

  const renderCalendarDate = (date) => {
    const { current, month, year } = dateState;
    const _date = new Date(date.join('-'));
    // Check if calendar date is same day as today
    const isToday = isSameDay(_date, today);

    // Check if calendar date is same day as currently selected date
    const isCurrent = current && isSameDay(_date, current);

    // Check if calendar date is in the same month as the state month and year
    const inCurrentMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));
    // The click handler
    const onClick = gotoDate(_date);
    const props = { onClick, title: _date.toDateString() };
    // Conditionally render a styled date component

    return (
      <div
        className={classNames(
          'hover:bg-white hover:text-[#080808] cursor-pointer rounded-full w-[41px] h-[41px] flex justify-center items-center text-sm',
          isToday || isCurrent ? 'bg-skyBlue' : '',
          isToday && isCurrent !== null && !isCurrent ? 'border-[1px] border-skyBlue bg-[#080808]' : '',
          inCurrentMonth ? 'text-white' : 'text-gray-500',
        )}
        key={getDateISO(_date)}
        {...props}
      >
        {_date.getDate()}
      </div>
    );
  };

  // new 2

  const gotoDate = (date: Date) => (evt) => {
    evt && evt.preventDefault();
    const { current } = dateState;

    !(current && isSameDay(date, current)) && addDateToState(date);
    // onDateChanged(date);
  };
  const gotoPreviousMonth = () => {
    const { month, year } = dateState;
    // this.setState(getPreviousMonth(month, year));
    const previousMonth = getPreviousMonth(month, year);
    setDateState({
      month: previousMonth.month,
      year: previousMonth.year,
      current: dateState.current,
    });
  };
  const gotoNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState({
      month: nextMonth.month,
      year: nextMonth.year,
      current: dateState.current,
    });
  };
  const gotoPreviousYear = () => {
    const { year } = dateState;
    setDateState({
      month: dateState.month,
      year: year - 1,
      current: dateState.current,
    });
  };
  const gotoNextYear = () => {
    const { year } = dateState;
    setDateState({
      month: dateState.month,
      year: year + 1,
      current: dateState.current,
    });
  };

  const handleChangeYear = () => {
    // setCalType('year');
  };

  const handlePrevious = (evt) => {
    evt && evt.preventDefault();
    if (calType === 'month') {
      const fn = evt.shiftKey ? gotoPreviousYear : gotoPreviousMonth;
      fn();
    }
  };
  const handleNext = (evt) => {
    evt && evt.preventDefault();
    if (calType === 'month') {
      const fn = evt.shiftKey ? gotoNextYear : gotoNextMonth;
      fn();
    }
  };

  return (
    <div className="w-[320px] bg-[#1B1B1B] flex flex-col px-[16px]">
      {renderMonthAndYear()}
      <div className="flex w-full justify-evenly">
        {Object.keys(WEEK_DAYS).map(renderDayLabel)}
      </div>
      <div className="flex flex-wrap w-full">
        {calType === 'month' && getCalendarDates().map(renderCalendarDate)}
        {calType === 'year' && <div>YEAR</div>}
      </div>
      <div className="flex mt-[20px] mb-[24px] justify-end">
        <div className="mx-[20px] text-sm">Cancel</div>
        <div className="mx-[43px] text-sm">OK</div>
      </div>
    </div>
  );
}
