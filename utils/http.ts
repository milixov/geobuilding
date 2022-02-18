import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 60 * 1000,
  validateStatus: (status) => status >= 200 && status <= 500,
});

http.interceptors.response.use(async (respone) => {

  //fake lag for show skeleton or loading
  await new Promise(r => setTimeout(r, 1000));
  
  return respone?.data;
});
