const stringToDate = (dateString: string): Date => {
  const parts = dateString.split('/');
  const year = Number(parts[2]);
  const month = Number(parts[1]) - 1; // Month is zero-indexed in JavaScript
  const day = Number(parts[0]);

  const date = new Date(year, month, day);

  return date;
};

export default stringToDate;
