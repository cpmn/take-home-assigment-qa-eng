export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedMonth = month;
    const formattedDay = day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedMonth}/${formattedDay}/${year} ${formattedHours}:${formattedMinutes}`;
  }