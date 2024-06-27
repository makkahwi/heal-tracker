import { AxiosResponse } from "axios";

import service, { demoStatus } from ".";
import { mockScheduleData } from "./mockData";

const getAll = async () => {
  switch (demoStatus()) {
    default:
      return await service
        .get("schedule.json")
        .then((res: AxiosResponse) => Object.values(res.data));
  }
};

const create = async (data = {}) => {
  switch (demoStatus()) {
    default:
      return await service.post("schedule.json", data);
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
