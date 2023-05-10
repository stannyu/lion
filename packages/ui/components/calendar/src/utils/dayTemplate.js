import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

const defaultMonthLabels = [
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
const firstWeekDays = [1, 2, 3, 4, 5, 6, 7];
const lastDaysOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 *
 * @param {import('../../types/day.js').Day} day
 * @param {{ weekdays: string[], monthsLabels?: string[] }} opts
 */
export function dayTemplate(day, { weekdays, monthsLabels = defaultMonthLabels }) {
  const dayNumber = day.date.getDate();
  const monthName = monthsLabels[day.date.getMonth()];
  const year = day.date.getFullYear();
  const weekdayName = day.weekOrder ? weekdays[day.weekOrder] : weekdays[0];

  const firstDay = dayNumber === 1;
  const endOfFirstWeek = day.weekOrder === 6 && firstWeekDays.includes(dayNumber);
  const startOfFirstFullWeek = day.startOfWeek && firstWeekDays.includes(dayNumber);

  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    lastDaysOfYear[1] = 29;
  }
  const lastDayNumber = lastDaysOfYear[day.date.getMonth()];
  const lastWeekDays = [];
  for (let i = lastDayNumber; i >= lastDayNumber - 7; i -= 1) {
    lastWeekDays.push(i);
  }
  const endOfLastFullWeek = day.weekOrder === 6 && lastWeekDays.includes(dayNumber);
  const startOfLastWeek = day.startOfWeek && lastWeekDays.includes(dayNumber);
  const lastDay = lastDayNumber === dayNumber;

  return html`
    <td
      role="gridcell"
      class="calendar__day-cell"
      ?current-month=${day.currentMonth}
      ?first-day=${firstDay}
      ?end-of-first-week=${endOfFirstWeek}
      ?start-of-first-full-week=${startOfFirstFullWeek}
      ?end-of-last-full-week=${endOfLastFullWeek}
      ?start-of-last-week=${startOfLastWeek}
      ?last-day=${lastDay}
    >
      <div
        role="button"
        .date=${day.date}
        class="calendar__day-button"
        tabindex=${ifDefined(day.tabindex)}
        aria-pressed=${ifDefined(day.ariaPressed)}
        aria-current=${ifDefined(day.ariaCurrent)}
        aria-disabled=${day.disabled ? 'true' : 'false'}
        ?selected=${day.selected}
        ?past=${day.past}
        ?today=${day.today}
        ?future=${day.future}
        ?previous-month=${day.previousMonth}
        ?current-month=${day.currentMonth}
        ?next-month=${day.nextMonth}
      >
        <span class="calendar__day-button__text">${dayNumber}</span>
        <span class="u-sr-only">${`${monthName} ${year} ${weekdayName}`}</span>
      </div>
    </td>
  `;
}
