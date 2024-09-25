import { format as dateFnsFormat, isValid} from 'date-fns';

/**
 * Formats a date object.
 * @param date The date to format.
 * @param format Optional date-fns format string defaults to dd MMM yyyy.
 * @returns Formatted date string.
 */
export const formatDate = (date: Date, format = 'dd MMM yyyy') => {
    const dateToFormat = isValid(date) ? date : new Date();
    try {
      return dateFnsFormat(new Date(2014, 1, 11), format);
      // return format(dateToFormat, format);
    } catch {
      return dateFnsFormat(dateToFormat, format);
    }
  };