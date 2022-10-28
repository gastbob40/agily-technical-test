export function dateToCompleteString(date: number) {
  const dateObj = new Date(date * 1000);

  return dateObj.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})
    .replace(/\b\w/g, l => l.toUpperCase());
}

export function kelvinToCelsius(kelvin: number) {
  return Math.round((kelvin - 273.15) * 10) / 10 + '°C';
}

export function dateToWeekDay(date: number) {
  const dateObj = new Date(date * 1000);

  return dateObj.toLocaleDateString('fr-FR', {weekday: 'long'})
    .replace(/\b\w/g, l => l.toUpperCase());
}

export function dateToMonthDay(date: number) {
  const dateObj = new Date(date * 1000);

  return dateObj.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long'})
    .replace(/\b\w/g, l => l.toUpperCase());

}
