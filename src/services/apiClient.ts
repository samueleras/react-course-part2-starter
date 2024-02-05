import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  //For paginated or infinite queries
  /*   getPage = ({ pageNumber, pageSize }: PageParams, params?: any) => {
    return this.getAll({
      params: {
        _start: (pageNumber - 1) * pageSize,
        _limit: pageSize,
        ...params,
      },
    });
  }; */

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
