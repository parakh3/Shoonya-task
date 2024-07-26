
export function formatUnixTimestamp(timestamp) {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  function getStartOfYearTimestamp(year) {
    const startDate = new Date(year, 0, 1); // January is month 0 in JavaScript Date
    return Math.floor(startDate.getTime() / 1000); // Convert milliseconds to seconds
  }
  console.log(getStartOfYearTimestamp(2024))
  