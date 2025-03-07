import axios from "axios";
import { getSettings } from "./settings-service";

const apiClient = axios.create({
  baseURL: getSettings().apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: getSettings().newsletterUsername,
    password: getSettings().newsletterPwd,
  },
});

export default apiClient;
