import axios from "axios";
import { refreshToken, signOut } from "../Store/authSlice";
import { addLoading, removeLoading } from "../Store/loading";
import { addNotifications } from "../Store/notifications";
import store from "../Store/store";
import i18n from "../i18n";

const service = axios.create({
  baseURL:
    "https://personal-diet-tracker-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to check if the token is expired
const isTokenExpired = (expiresAt: number): boolean => {
  return Date.now() > expiresAt;
};

service.interceptors.request.use(
  async (config) => {
    let user = store.getState().auth?.user;

    store.dispatch(addLoading());

    const now = new Date();

    if (["post"].includes(config.method || "")) {
      config.data = {
        ...config.data,
        created_at: now,
        updated_at: now,
      };
    }

    if (["post", "put", "patch"].includes(config.method || "")) {
      config.data = {
        ...config.data,
        updated_at: now,
      };
    }

    if (user?.idToken) {
      // Check if the token is expired
      if (isTokenExpired(user.expiresAt)) {
        try {
          // Dispatch the refresh token action
          const resultAction = await store.dispatch(
            refreshToken(user.refreshToken)
          );
          if (refreshToken.fulfilled.match(resultAction)) {
            user = {
              ...user,
              idToken: resultAction.payload.id_token,
              refreshToken: resultAction.payload.refresh_token,
              expiresAt: Date.now() + resultAction.payload.expires_in * 1000,
            };
            // Update the user in local storage
            localStorage.setItem("user", JSON.stringify(user));
          } else {
            // If refresh token fails, sign out the user
            store.dispatch(signOut());
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          // If refresh token fails, sign out the user
          store.dispatch(signOut());
          throw error;
        }
      }

      // Set the refreshed (or existing) token in the request
      config.params = config.params || {};
      config.params.auth = user.idToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const expiredTokenHandler = () => {
  store.dispatch(signOut());
};

service.interceptors.response.use(
  (res) => {
    store.dispatch(removeLoading());

    if ([200, 201, 204].includes(res.status)) {
      const created = res.config.method?.toUpperCase() === "POST";
      const updated = res.config.method?.toUpperCase() === "PUT";
      const deleted = res.config.method?.toUpperCase() === "DELETE";

      if (created || updated || deleted) {
        store.dispatch(
          addNotifications({
            msg: i18n.t("Layout.Successful", {
              method: created
                ? i18n.t("Layout.Created")
                : updated
                ? i18n.t("Layout.Updated")
                : deleted
                ? i18n.t("Layout.Deleted")
                : i18n.t("Layout.Called"),
            }),
          })
        );
      }
      return res.data;
    }

    if ([401, 403].includes(res.status)) {
      expiredTokenHandler();
    }

    return Promise.reject(res);
  },
  (err) => {
    store.dispatch(removeLoading());
    const created = err.config.method?.toUpperCase() === "POST";
    const updated = err.config.method?.toUpperCase() === "PUT";
    const deleted = err.config.method?.toUpperCase() === "DELETE";

    if (created || updated || deleted) {
      store.dispatch(
        addNotifications({
          msg: i18n.t("Layout.Unsuccessful", {
            method: created
              ? i18n.t("Layout.Created")
              : updated
              ? i18n.t("Layout.Updated")
              : deleted
              ? i18n.t("Layout.Deleted")
              : i18n.t("Layout.Called"),
          }),
          err: true,
        })
      );
    }

    if ([401, 403].includes(err?.response?.status)) {
      expiredTokenHandler();
    }

    return Promise.reject(err);
  }
);

const getAll = async (table = "") => {
  const user = store.getState().auth.user;

  return await service.get(`${table}/${user.localId}.json`).then((res) => {
    const data = res
      ? Object.entries(res).map(([id, values]) => ({ id, ...values }))
      : [];
    return data;
  });
};

const get = async (table = "") => {
  const user = store.getState().auth.user;

  return await service.get(`${table}/${user.localId}.json`).then((res: any) => {
    return { value: res.x };
  });
};

const create = async (table = "", data = {}) => {
  const user = store.getState().auth.user;

  return await service.post(`${table}/${user.localId}.json`, data);
};

interface updateProps {
  table: string;
  id: string;
  data: string | object;
}

const update = async ({ table = "", id, data }: updateProps) => {
  const user = store.getState().auth.user;

  return await service.patch(`${table}/${user.localId}.json`, { [id]: data });
};

const remove = async (table = "", id = "") => {
  const user = store.getState().auth.user;

  return await service.delete(`${table}/${user.localId}/${id}.json`);
};

export { create, get, getAll, remove, update };
