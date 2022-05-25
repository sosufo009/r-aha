import { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined
} from '@mui/icons-material';

/** The list of week name */
const WEEK_NAME = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Calendar props
 * @param {Moment=} defaultDate - The default select date, if not exist then use current date.
 * @param {string=} titleText - The text display on the top.
 * @param {Object=} cancelObj - The cancel button details, include the title and click function.
 * @param {Object=} confirmObj - The confirm button details, include the title and click function
 */
interface CalendarProps {
  defaultDate?: moment.Moment;
  titleText?: string;
  cancelObj?: {
    title: string;
    fn: () => void;
  };
  confirmObj?: {
    title: string;
    fn: () => void;
  };
}

const Calendar = (props: CalendarProps) => {
  const defaultDate = props.defaultDate || moment();
  const [dateState, setDateState] = useState<{
    current: moment.Moment;
    month: number;
    year: number;
    type: 'month' | 'year';
  }>({
    current: defaultDate,
    month: parseInt(defaultDate.format('MM')) - 1,
    year: parseInt(defaultDate.format('YYYY')),
    type: 'month'
  });

  const getCurrentMonth = () => parseInt(dateState.current.format('MM')) - 1;
  const getCurrentYear = () => parseInt(dateState.current.format('YYYY'));

  /**
   * The function for get date element list
   * @param {number} [month=getCurrentMonth()] - To display which month.
   * @param {number} [year=getCurrentYear()] - To display which year.
   * @param {'month'|'year'} type - To display what kind of type. If month then should display the month calendar.
   */
  function getDateList(
    month = getCurrentMonth(),
    year = getCurrentYear(),
    type: 'month' | 'year'
  ) {
    if (type === 'month') {
      const currentMonthList = [];
      const lastMonthList = [];
      const nextMonthList = [];

      const currentMonth = moment().set('year', year).set('month', month);
      const firstDateWeek = currentMonth.startOf('month').day();
      const lastDateWeek = currentMonth.endOf('month').day();
      const todayDate = moment();

      /** The for loop for get current month list */
      for (
        let i = 1;
        i <= parseInt(currentMonth.endOf('month').format('D'));
        i++
      ) {
        currentMonth.set('date', i);
        const isToday = moment(todayDate).isSame(currentMonth, 'day');
        const isSelect = moment(dateState.current).isSame(currentMonth, 'day');

        currentMonthList.push(
          <div
            className={classNames(
              'text-white w-[36px] h-[36px] flex justify-center items-center rounded-full text-sm',
              isToday || isSelect
                ? 'bg-skyBlue hover:bg-skyBlue'
                : 'hover:bg-white hover:text-black cursor-pointer',
              isToday && !isSelect
                ? 'border border-skyBlue bg-transparent hover:bg-white hover:text-black hover:border-0 cursor-pointer'
                : ''
            )}
            onClick={() => selectDate(i, month, year, 'month')}
            key={`dateItem${year}${month}${i}`}
          >
            {i}
          </div>
        );
      }

      const lastMonth = currentMonth.subtract(1, 'month').endOf('month');
      const lastDate = lastMonth.format('DD');

      /** The for loop for get last month list */
      for (let i = 0; i < firstDateWeek; i++) {
        const lastD = parseInt(lastDate) - i;
        lastMonthList.push(
          <div
            className="text-gray-500 w-[36px] h-[36px] text-sm flex justify-center items-center hover:bg-white rounded-full hover:text-black cursor-pointer"
            onClick={() =>
              selectDate(
                lastD,
                parseInt(lastMonth.format('MM')) - 1,
                parseInt(lastMonth.format('YYYY')),
                'month'
              )
            }
            key={`dateItem${parseInt(lastMonth.format('YYYY'))}${
              parseInt(lastMonth.format('MM')) - 1
            }${lastD}`}
          >
            {lastD}
          </div>
        );
      }

      const nextMonth = currentMonth.add(2, 'month').startOf('month');
      const nextDate = nextMonth.format('DD');

      /** The for loop for get next month list */
      for (let i = 0; i < 6 - lastDateWeek; i++) {
        const nextD = parseInt(nextDate) + i;
        nextMonthList.push(
          <div
            className="text-gray-500 w-[36px] h-[36px] flex text-sm justify-center items-center hover:bg-white rounded-full hover:text-black cursor-pointer"
            onClick={() =>
              selectDate(
                nextD,
                parseInt(nextMonth.format('MM')) - 1,
                parseInt(nextMonth.format('YYYY')),
                'month'
              )
            }
            key={`dateItem${parseInt(nextMonth.format('YYYY'))}${
              parseInt(nextMonth.format('MM')) - 1
            }${nextD}`}
          >
            {nextD}
          </div>
        );
      }

      return [
        ...lastMonthList.reverse(),
        ...currentMonthList,
        ...nextMonthList
      ];
    }

    const baseYear = year - ((year % 20) - 1);
    const yearList = [];

    /** The for loop for get 20 years list */
    for (let i = 0; i < 20; i++) {
      yearList.push(
        <div
          className={classNames(
            'h-[24px] flex justify-center items-center text-sm mb-6 w-1/4'
          )}
          onClick={() => selectYear(baseYear + i, 'month')}
          key={`yearItem${baseYear + i}`}
        >
          <span
            className={classNames(
              'px-3 rounded-sm box-border py-0.5 cursor-pointer',
              baseYear + i === year
                ? 'bg-skyBlue hover:bg-skyBlue'
                : 'hover:bg-white hover:text-black'
            )}
          >
            {baseYear + i}
          </span>
        </div>
      );
    }
    return yearList;
  }

  /** The function for prepare generate the list */
  const preGetTableData = () => {
    const { month, year, type } = dateState;
    return getDateList(month, year, type);
  };

  /** The function for generate title */
  const renderTitle = () => {
    const { month, year } = dateState;
    return (
      <div className="text-[28px] font-bold">
        {moment.monthsShort()[month]}, {year}
      </div>
    );
  };

  /** The function for generate middle function bar */
  const renderFunctionBar = () => {
    const { year, month, type } = dateState;
    return (
      <div className="flex justify-between">
        <div className="cursor-pointer" onClick={() => handleLeftArrow()}>
          <ArrowBackIosNewOutlined sx={{ fontSize: '12px' }} />
        </div>
        <div className="text-base" onClick={() => selectYear(year, 'year')}>
          {type === 'month' ? moment.months()[month] : ''} {year}
        </div>
        <div className="cursor-pointer" onClick={() => handleRightArrow()}>
          <ArrowForwardIosOutlined sx={{ fontSize: '12px' }} />
        </div>
      </div>
    );
  };

  /** The function for handle left arrow event */
  const handleLeftArrow = () => {
    const { month, year, type } = dateState;
    if (type === 'year') {
      setDateState({
        ...dateState,
        year: dateState.year - 20
      });
    } else {
      setDateState({
        ...dateState,
        month: month - 1 === -1 ? 11 : month - 1,
        year: month - 1 === -1 ? year - 1 : year
      });
    }
  };

  /** The function for handle right arrow event */
  const handleRightArrow = () => {
    const { month, year, type } = dateState;
    if (type === 'year') {
      setDateState({
        ...dateState,
        year: dateState.year + 20
      });
    } else {
      setDateState({
        ...dateState,
        month: month + 1 === 12 ? 0 : month + 1,
        year: month + 1 === 12 ? year + 1 : year
      });
    }
  };

  /**
   * The function for handle date select event
   * @param {number} day - The day that select by user.
   * @param {number} month - The dmonthay that select by user.
   * @param {number} year - The year that select by user.
   * @param {'month'|'year'} type - To display what kind of type. If month then should display the month calendar.
   */
  const selectDate = (
    day: number,
    month: number,
    year: number,
    type: 'month' | 'year'
  ) => {
    const selectDate = moment()
      .set('year', year)
      .set('month', month)
      .set('date', day);
    setDateState({
      current: selectDate,
      month: dateState.month,
      year: dateState.year,
      type
    });
  };

  /**
   * The function for handle year select event
   * @param {number} year - The year that select by user.
   * @param {'month'|'year'} type - To display what kind of type. If month then should display the month calendar.
   */
  const selectYear = (year: number, type: 'month' | 'year') => {
    if (type === 'year') {
      setDateState({
        ...dateState,
        year,
        type
      });
    } else {
      const newDate = dateState.current.set('year', year);
      setDateState({
        ...dateState,
        current: newDate,
        year,
        type
      });
    }
  };

  return (
    <div className="bg-[#1B1B1B] w-[320px] shadow-boxShadow rounded-[10px]">
      <div className="pt-[17px] mb-6 mx-6">
        {props.titleText && <div>{props.titleText}</div>}
        {renderTitle()}
      </div>
      <div className="mb-[23px] px-5">{renderFunctionBar()}</div>
      {dateState.type === 'month' && (
        <div className="flex mx-4 justify-evenly mb-3">
          {WEEK_NAME.map((week) => (
            <div
              key={week}
              className="w-[36px] flex justify-center text-[11px] text-gray-500"
            >
              {week}
            </div>
          ))}
        </div>
      )}
      <div
        className={classNames(
          'flex flex-wrap justify-evenly border border-y-0 border-[#1B1B1B] box-border pb-1',
          dateState.type === 'year' ? 'mx-6' : 'mx-4'
        )}
      >
        {(preGetTableData() || []).map((item) => item)}
      </div>
      {(props?.cancelObj || props?.confirmObj) && (
        <div className="flex justify-end pb-6">
          {props?.cancelObj && (
            <div
              className="text-sm px-9 cursor-pointer"
              onClick={props.cancelObj.fn}
            >
              {props.cancelObj.title}
            </div>
          )}
          {props?.confirmObj && (
            <div
              className="text-sm px-9 cursor-pointer"
              onClick={props.confirmObj.fn}
            >
              {props.confirmObj.title}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
