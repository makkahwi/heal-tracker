import * as htmlToImage from "html-to-image";
import moment from "moment";

import { addLoading, removeLoading } from "../Store/loading";
import store from "../Store/store";

export const getAverage = (list = [0]) => {
  return list.reduce((final, current) => (current += final), 0) / list.length;
};

export const timeDifference = (time1 = moment(), time2 = moment()) => {
  const duration = moment.duration(time2.diff(time1));

  return moment.utc(duration.asMilliseconds()).format("HH:mm");
};

export const elementToImage = async ({
  element,
  title = "Download",
}: {
  title?: string;
  element?: HTMLElement;
}) => {
  if (element) {
    store.dispatch(addLoading());

    await htmlToImage.toJpeg(element).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    });

    store.dispatch(removeLoading());
  } else return "";
};
