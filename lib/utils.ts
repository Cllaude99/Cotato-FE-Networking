export function formatToTimeAgo(date: string) {
  const hourInMs = 1000 * 60 * 60;
  const dayInMs = hourInMs * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diffInMs = now - time;

  const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if (diffInMs < dayInMs) {
    // 24시간 미만인 경우 시간 단위로 표시
    const hours = Math.round(diffInMs / hourInMs);
    return formatter.format(-hours, 'hour');
  } else {
    // 24시간 이상인 경우 일 단위로 표시
    const days = Math.round(diffInMs / dayInMs);
    return formatter.format(-days, 'day');
  }
}
