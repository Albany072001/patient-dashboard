export function formatDate(dateString) { // Format a date string into a more readable format.
  const date = new Date(dateString); // Create a new Date object from the input date string.

  return date.toLocaleDateString(); // Return the date in a localized string format (e.g., "MM/DD/YYYY" in the US).
}