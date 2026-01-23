/**
 * Formats a date string or Date object to a localized date string
 * @param date - The date to format (string or Date object)
 * @returns Formatted date string, or 'N/A' if date is invalid or empty
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'N/A';

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  } catch {
    return 'N/A';
  }
};
