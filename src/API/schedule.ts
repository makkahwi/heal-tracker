import service, { demoStatus } from ".";
import { mockScheduleData } from "./mockData";

const getAll = () => {
  switch (demoStatus()) {
    case true:
      return mockScheduleData;
    default:
      return service.get("schedule.json");
  }
};

const create = (data = {}) => {
  switch (demoStatus()) {
    case true:
      return mockScheduleData[0];
    default:
      return service.post("schedule.json", data);
  }
};

const update = (data = {}) => {
  switch (demoStatus()) {
    case true:
      return mockScheduleData[0];
    default:
      return service.put("schedule.json", data);
  }
};

export { getAll, create, update };
