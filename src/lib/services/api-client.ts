import axios from "axios";
import { getSettings } from "./settings-service";

const apiClient = axios.create({
  baseURL: getSettings().apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${getSettings().newsletterUp}`,
  },
});

export default apiClient;
