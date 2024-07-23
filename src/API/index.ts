import axios from "axios";

import store from "../Store/store";

const PROJECT_ID = "personal-diet-tracker";

const service = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
