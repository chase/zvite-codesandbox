const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MILLISECOND = SECOND / 1000;
const relTimeFormat = new Intl.RelativeTimeFormat();

function relativeTime(diff: number) {
  let unit: Intl.RelativeTimeFormatUnit;
  if (diff < MINUTE) {
    unit = 'second';
  } else if (diff < HOUR) {
    unit = 'minute';
    diff /= MINUTE;
  } else if (diff < DAY) {
    unit = 'hour';
    diff /= HOUR;
  } else {
    unit = 'day';
    diff /= DAY;
  }
  return relTimeFormat.format(-Math.round(diff), unit);
}

/**
 * Converts a date into a relative time
 *
 * Assumes that the date is in the past
 */
function relativeDate(dateString: string) {
  const date = new Date(dateString);
  const diff = (new Date().getTime() - date.getTime()) * MILLISECOND;
  return diff > 5 * DAY ? date.toLocaleString() : relativeTime(diff);
}

export default relativeDate;
