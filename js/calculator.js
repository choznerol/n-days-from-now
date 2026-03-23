export const WEEKDAYS_ZH = ["日", "一", "二", "三", "四", "五", "六"];

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = WEEKDAYS_ZH[date.getDay()];
  return `${year}-${month}-${day}（${weekday}）`;
}

/** Parse "YYYY-MM-DD" as local date (not UTC). */
export function parseLocalDate(str) {
  const [year, month, day] = str.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Today as "YYYY-MM-DD" for <input type="date">. */
export function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const PRESET_DAYS = [7, 14, 28, 56, 70, 77, 84, 161];
