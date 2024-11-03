import moment from "moment";

export const getAverage = (list = [0]) => {
  return list.reduce((final, current) => (current += final), 0) / list.length;
};

export const timeDifference = (time1 = moment(), time2 = moment()) => {
  const duration = moment.duration(time2.diff(time1));

  return moment.utc(duration.asMilliseconds()).format("HH:mm");
};
