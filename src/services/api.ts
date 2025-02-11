import axios from "axios";
import { Iapiresponse } from "../types/type";

const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/users",
});

class API<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (page?: number) => {
    return axiosInstance
      .get<Iapiresponse<T[]>>(this.endpoint, {
        params: { page },
      })
      .then((res) => res.data);
  };

  getOne = () => {
    return axiosInstance
      .get<Iapiresponse<T>>(this.endpoint)
      .then((res) => res.data);
  };
}

export default API;
