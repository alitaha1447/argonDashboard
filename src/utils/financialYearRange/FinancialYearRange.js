export const fetchFinancialYearRangeByDate = (date = new Date()) => {
  const today = new Date(date);

  let startDate, endDate;

  if (today.getMonth() + 1 <= 3) {
    startDate = new Date(today.getFullYear() - 1, 3, 1); // April 1
    endDate = new Date(today.getFullYear(), 2, 31); // March 31
  } else {
    startDate = new Date(today.getFullYear(), 3, 1); // April 1
    endDate = new Date(today.getFullYear() + 1, 2, 31); // March 31
  }

  const formatDateToYYYYMMDD = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDateToYYYYMMDD(startDate);
  const formattedEndDate = formatDateToYYYYMMDD(endDate);
  //   const financialYear1 = `${startDate.getFullYear()}-${endDate.getFullYear()}`;

  // Make sure this return is hit!
  return {
    startDate1: formattedStartDate,
    endDate1: formattedEndDate,
    // financialYear1,
  };
};
