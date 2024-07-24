import axios from "axios";

import { signOut } from "../Store/authSlice";
import store from "../Store/store";

const service = axios.create({
  baseURL:
    "https://personal-diet-tracker-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    const user = store.getState().auth?.user;

    if (user?.idToken) {
      config.params = config.params || {};
      config.params.auth = user.idToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (res) => {
    if ([200, 201, 204].includes(res.status)) {
      return res.data;
    }

    if ([401, 403].includes(res.status)) {
      store.dispatch(signOut());
    }

    return Promise.reject(res);
  },
  (err) => {
    if ([401, 403].includes(err?.response?.status)) {
      store.dispatch(signOut());
    }

    return Promise.reject(err);
  }
);

const getAll = async (table = "") => {
  const user = store.getState().auth.user;

  return await service
    .get(`${table}/${user.localId}.json`)
    .then((res) => {
      const data = res
        ? Object.entries(res).map(([id, values]) => ({ id, ...values }))
        : [];
      return data;
    })
    .catch((error) => {
      console.error(
        "Get All Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

const create = async (table = "", data = {}) => {
  const user = store.getState().auth.user;

  return await service.post(`${table}/${user.localId}.json`, {
    ...data,
    uid: user.localId,
  });
};

const update = async (table = "", data = { id: "" }) => {
  const user = store.getState().auth.user;

  return await service.patch(`${table}/${user.localId}/${data.id}.json`, {
    ...data,
    uid: user.localId,
  });
};

const remove = async (table = "", id = "") => {
  const user = store.getState().auth.user;

  return await service.delete(`${table}/${user.localId}/${id}.json`);
};

export { create, getAll, remove, update };
