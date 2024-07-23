import axios, { AxiosResponse } from "axios";

const PROJECT_ID = "personal-diet-tracker";

const service = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/`,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAll = async (table = "", token = "") =>
  await service
    .get(table, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res: AxiosResponse) =>
      res.data.documents.map(({ name, fields }: any) =>
        Object.keys(fields).reduce(
          (final, key) => ({ ...final, [key]: fields[key]?.stringValue }),
          { id: name.split("/")[name.split("/").length - 1] }
        )
      )
    );

const create = async (table = "", data = {}, token = "", localId = "") =>
  await service.post(
    table,
    {
      fields: Object.keys(data).reduce(
        (final, key) => ({
          ...final,
          [key]: { stringValue: (data as any)[key] },
        }),
        { uid: { stringValue: localId } }
      ),
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

const update = async (
  table = "",
  data = { id: "" },
  token = "",
  localId = ""
) =>
  await service.patch(
    `${table}/${data.id}`,
    {
      fields: Object.keys(data).reduce(
        (final, key) => ({
          ...final,
          [key]: { stringValue: (data as any)[key] },
        }),
        { uid: { stringValue: localId } }
      ),
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

const remove = async (table = "", id = "", token = "") =>
  await service.delete(`${table}/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export { getAll, create, update, remove };
