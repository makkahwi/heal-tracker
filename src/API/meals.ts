import { AxiosResponse } from "axios";

import service, { demoStatus } from ".";

const getAll = async () => {
  switch (demoStatus()) {
    default:
      return await service
        .get("meals.json")
        .then((res: AxiosResponse) =>
          Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
        );
  }
};

const create = async (data = {}) => {
  switch (demoStatus()) {
    default:
      return await service.post("meals.json", data);
  }
};

const remove = async (id = "") => {
  switch (demoStatus()) {
    default:
      return await service.delete(`meals/${id}.json`);
  }
};

export { getAll, create, remove };
