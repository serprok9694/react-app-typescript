import { notification } from "antd";
import axios from "axios";

export const getRequest = (url: string) => axios.get(url, { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });

export const openErrorNotification = (message: string, description: string) => {
  notification.error({ message, description });
};
