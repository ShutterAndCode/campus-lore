export function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);

  const seconds = Math.floor((target - now) / 1000);

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const units = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  for (const { unit, seconds: unitSeconds } of units) {
    const value = Math.round(seconds / unitSeconds);

    if (Math.abs(value) >= 1) {
      return formatter.format(value, unit);
    }
  }

  if (Math.abs(seconds) < 30) {
    return "Just now";
  }

  return formatter.format(Math.round(seconds), "second");
}
