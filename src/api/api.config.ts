import type { AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    api_key: 1234,
    deviceId: deviceDetail(2),
    deviceToken: deviceDetail(1),
    timezone: deviceDetail(),
    deviceType: "Web",
    "accept-language": "en",
  },
});
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    } else {
      config.headers["authorization"] =
        "Basic " + btoa("kulud" + ":" + "kulud@123");
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log("Errro ocucuered", error);
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong";
    toast.error(message);
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

function deviceDetail(info?: number): string {
  /*---1=device_token, 2=deviceId, 3=platform---*/
  switch (info) {
    case 1:
      return attachDeviceToken();
    case 2:
      return randomDeviceId();
    case 3:
      return "Web";
    default:
      return getTimeZone().toString();
  }
}

function attachDeviceToken() {
  return (Date.now() + Math.floor(Math.random() * 1000000) + 1).toString();
}

function randomDeviceId() {
  return window.navigator.userAgent.replace(/\D+/g, "");
}

function getTimeZone() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * -1;
  return offset * 60 * 1000;
}
