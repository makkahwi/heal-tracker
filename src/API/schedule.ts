import { mockScheduleData } from "./mockData";

const getAll = () => {
  switch (true) {
    case true:
      return mockScheduleData;
    default:
      return mockScheduleData;
  }
};

const create = () => {
  switch (true) {
    case true:
      return mockScheduleData[0];
    default:
      return mockScheduleData[0];
  }
};

const update = () => {
  switch (true) {
    case true:
      return mockScheduleData[0];
    default:
      return mockScheduleData[0];
  }
};

export { getAll, create, update };
