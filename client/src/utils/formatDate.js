export default function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU').format(date);
}