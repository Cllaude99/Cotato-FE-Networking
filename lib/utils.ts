export function formatToTimeAgo(date: string) {
  const minuteInMs = 1000 * 60;
  const hourInMs = minuteInMs * 60;
  const dayInMs = hourInMs * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diffInMs = now - time;

  const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if (diffInMs < minuteInMs) {
    // 1분 미만인 경우 "0분"으로 표시
    return '0분 전';
  } else if (diffInMs < hourInMs) {
    // 1시간 미만인 경우 분 단위로 표시
    const minutes = Math.round(diffInMs / minuteInMs);
    return formatter.format(-minutes, 'minute');
  } else if (diffInMs < dayInMs) {
    // 24시간 미만인 경우 시간 단위로 표시
    const hours = Math.round(diffInMs / hourInMs);
    return formatter.format(-hours, 'hour');
  } else {
    // 24시간 이상인 경우 일 단위로 표시
    const days = Math.round(diffInMs / dayInMs);
    return formatter.format(-days, 'day');
  }
}
