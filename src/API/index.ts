import axios from "axios";

const service = axios.create({
  baseURL:
    "https://personal-diet-tracker-default-rtdb.europe-west1.firebasedatabase.app//",
  headers: {
    "Content-Type": "application/json",
  },
});

export const demoStatus = () => false;

export default service;
