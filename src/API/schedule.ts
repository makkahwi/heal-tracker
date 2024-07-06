import { AxiosResponse } from "axios";

import service, { demoStatus } from ".";

const getAll = async () => {
  switch (demoStatus()) {
    default:
      return await service
        .get("schedule.json")
        .then((res: AxiosResponse) =>
          Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
        );
  }
};

const create = async (data = {}) => {
  switch (demoStatus()) {
    default:
      return await service.post("schedule.json", data);
  }
};

const remove = async (id = "") => {
  switch (demoStatus()) {
    default:
      return await service.delete(`schedule/${id}.json`);
  }
};

export { create, getAll, remove };
