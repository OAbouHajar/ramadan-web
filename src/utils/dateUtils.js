// src/utils/dateUtils.js

export const getHijriDate = (date) => {
  return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const getRamadanDay = (date) => {
  // This is an estimation. For precise moon sighting, we usually need an API.
  // However, we can use the Intl API to get the day of the month for Ramadan.
  const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric'
  });
  const parts = formatter.formatToParts(date);
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;

  // 9 is Ramadan
  if (month === '9') {
    return parseInt(day, 10);
  }
  return null; // Not Ramadan
};
