export default function formatDate(date) {
  return Intl.DateTimeFormat('ru-RU').format(date);
}