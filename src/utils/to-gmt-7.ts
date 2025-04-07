export function toGMT7(date: Date | string): string {
  const d = new Date(date);
  const offset = 7 * 60 * 60 * 1000;
  const gmt7Date = new Date(d.getTime() + offset);
  return gmt7Date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });
}
