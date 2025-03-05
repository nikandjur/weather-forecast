// services/getShotDay.ts
// export const getShortDayOfWeek = (timestamp: number): string => {
//   const date = new Date(timestamp * 1000);
//   const options: Intl.DateTimeFormatOptions = { weekday: "short" };
//   return date.toLocaleDateString("ru-RU", options);
// };

export const getShortDayOfWeek = (unixTime: number) => {
  const date = new Date(unixTime * 1000);

  const dayOfWeekLong = date.toLocaleString("ru-RU", { weekday: "long" });
  const dayOfWeekShort = date.toLocaleString("ru-RU", { weekday: "short" });
  const hours = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });

  return {
    dayOfWeek: {
      long: dayOfWeekLong,
      short: dayOfWeekShort,
    },
    hours,
    dayOfMonth,
    month,
  };
};
