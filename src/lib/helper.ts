import dayjs from 'dayjs';

function getTime(date: Date) {
  return dayjs(date).format('HH:mm');
}

function getDate(date: Date) {
  return dayjs(date).format('DD.MM.YYYY');
}

function getDateTime(date: Date) {
  return dayjs(date).format('ddd DD.MM.YYYY HH:mm');
}

function getDuration(start: Date, end: Date) {
  const duration = dayjs(end).diff(dayjs(start), 'second');
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;
  //console.log("get duration")
  //console.log(durationInterval)
  return `${hours}h ${minutes}m ${seconds}s`;
}

function getLocaleDateTimeStr(date: Date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

export { getTime, getDate, getDateTime, getDuration, getLocaleDateTimeStr };
