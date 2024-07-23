import { AxiosResponse } from "axios";

import service from ".";

const getAll = async () =>
  await service
    .get("schedule.json")
    .then((res: AxiosResponse) =>
      Object.keys(res.data).map((key) => ({ ...res.data[key], id: key }))
    );

const create = async (data = {}) => await service.post("schedule.json", data);

const remove = async (id = "") => await service.delete(`schedule/${id}.json`);

export { create, getAll, remove };
