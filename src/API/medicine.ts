import { AxiosResponse } from "axios";

import service, { demoStatus } from ".";

const getAll = async () => {
  switch (demoStatus()) {
    default:
      return await service
        .get("medicine.json")
        .then((res: AxiosResponse) =>
          Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
        );
  }
};

const create = async (data = {}) => {
  switch (demoStatus()) {
    default:
      return await service.post("medicine.json", data);
  }
};

const remove = async (id = "") => {
  switch (demoStatus()) {
    default:
      return await service.delete(`medicine/${id}.json`);
  }
};

export { getAll, create, remove };
