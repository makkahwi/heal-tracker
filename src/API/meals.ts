import { AxiosResponse } from "axios";

import service from ".";

const getAll = async () =>
  await service
    .get("meals.json")
    .then((res: AxiosResponse) =>
      Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
    );

const create = async (data = {}) => await service.post("meals.json", data);

const remove = async (id = "") => await service.delete(`meals/${id}.json`);

export { getAll, create, remove };
