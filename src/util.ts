/**
 * 将时间戳转换为可读日期格式
 * @param timestamp 时间戳（毫秒）
 * @param format 格式字符串，可选参数，默认：'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * 
 * 格式符号说明：
 * YYYY - 四位数年份
 * MM   - 两位数月份（01-12）
 * DD   - 两位数日期（01-31）
 * HH   - 24小时制小时（00-23）
 * mm   - 分钟（00-59）
 * ss   - 秒（00-59）
 */
export function timestampToDate(timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const date = new Date(timestamp);
  
  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp');
  }

  const padZero = (num: number) => num.toString().padStart(2, '0');
  
  const parts = {
    YYYY: date.getFullYear().toString(), // 转换为字符串
    MM: padZero(date.getMonth() + 1),
    DD: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds())
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => parts[match as keyof typeof parts] || '');
}

// 使用示例：
// timestampToDate(1719749010000) => "2024-07-01 15:03:30"
// timestampToDate(Date.now(), 'YYYY年MM月DD日 HH时mm分') => "2024年07月01日 15时03分"