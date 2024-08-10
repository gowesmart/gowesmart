export function formatDate(dateString) {
  const dateObj = new Date(dateString);

  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();

  const formattedDate = `${String(day).padStart(2, "0")} - ${String(month).padStart(2, "0")} - ${year}`;

  return formattedDate;
}
