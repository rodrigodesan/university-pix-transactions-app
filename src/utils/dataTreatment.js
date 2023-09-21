export function capitalizeWords(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function translateMonth(month) {
  const capitalizedMonth = capitalizeWords(month);
  switch (capitalizedMonth) {
    case 'January':
      return 'Janeiro';
    case 'February':
      return 'Fevereiro';
    case 'March':
      return 'Março';
    case 'April':
      return 'Abril';
    case 'May':
      return 'Maio';
    case 'June':
      return 'Junho';
    case 'July':
      return 'Julho';
    case 'August':
      return 'Agosto';
    case 'September':
      return 'Setembro';
    case 'October':
      return 'Outubro';
    case 'November':
      return 'Novembro';
    case 'December':
      return 'Dezembro';
    default:
      return capitalizedMonth;
  }
}
