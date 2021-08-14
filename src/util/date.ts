import {Period} from '~/features/explore/context/filter/types';

export const MONTH_MAPPING = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ABBREVIATED_MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const ABBREVIATED_DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export function normalizeDateNumber(number: number) {
  return number.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });
}

// One day in milliseconds
const DAY = 1000 * 60 * 60 * 24;

export function getDayDiffCount(start: string, end: string) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const diffInTime = date2.getTime() - date1.getTime();

  return Math.round(diffInTime / DAY);
}

export const formattedDate = () => {
  const now = new Date();

  return `${now.getFullYear()}-${normalizeDateNumber(
    now.getMonth() + 1,
  )}-${normalizeDateNumber(now.getDate())}`;
};

export function formatPeriodLabel({checkIn, checkOut}: Period) {
  const dayDiffCount = getDayDiffCount(checkIn, checkOut);
  const nightsCount = dayDiffCount + 1;

  const startDate = new Date(checkIn);
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date(checkOut);
  endDate.setDate(endDate.getDate() + 1);

  function formatMonthDay(date: Date) {
    return `${ABBREVIATED_MONTH[date.getMonth()]} ${date.getDate()}`;
  }

  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  const prefixLabel = formatMonthDay(startDate);

  const suffixLabel = isSameMonth
    ? `${endDate.getDate()}`
    : formatMonthDay(endDate);

  if (checkIn && checkOut) {
    return `${prefixLabel} – ${suffixLabel}, ${endDate.getFullYear()}  •  ${nightsCount} nights`;
  }

  if (checkIn) {
    return `${prefixLabel} – ...`;
  }

  return '';
}
