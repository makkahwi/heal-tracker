import moment, { Moment } from "moment";

export const dayDateFormat = (date: string | Moment) =>
  moment(date).format("ddd, D MMM YYYY");
export const dateFormat = (date: string | Moment) =>
  moment(date).format("D MMM YYYY");
export const timeFormat = (time?: string | Moment) =>
  moment("2024-07-23T" + time).format("h:mm a");
