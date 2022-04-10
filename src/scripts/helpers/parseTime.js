export default function parseTime(timestamp) {
  const year = Number(timestamp.slice(0, 4));
  const month = Number(timestamp.slice(5, 7)) - 1;
  const date = Number(timestamp.slice(8, 10));
  const hours = Number(timestamp.slice(11, 13));
  const minutes = Number(timestamp.slice(14, 16));
  const seconds = Number(timestamp.slice(17, 19));

  return new Date(year, month, date, hours, minutes, seconds).toLocaleString();
}
