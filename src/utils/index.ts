import { notification } from "antd";
import axios from "axios";

export const getRequest = (url: string) => axios.get(url, { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
export const postRequest = (url: string, payload: any) => axios.post(url, payload, { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
export const updateRequest = (url: string, payload: any) => axios.patch(url, payload, { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
export const deleteRequest = (url: string) => axios.delete(url, { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });

export const openErrorNotification = (message: string, description: string) => {
  notification.error({ message, description });
};
