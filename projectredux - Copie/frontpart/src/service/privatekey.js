import axios from "axios";


import { axiosPublic } from "./publickey";

const refreshTokenFn = async () => {
  const sessions = JSON.parse(localStorage.getItem("token"));

  try {
    const{data}= await axiosPublic.post("/refreshToken", {
      token: sessions?.refreshToken
    });

    
 if (data.accessToken) {
    localStorage.setItem("token", JSON.stringify(data));  
    console.log(data)
 }
    




    return data;
  } catch (error) {
  console.log(error)
 
  }
};



















axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem("token"));

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization:`Bearer ${session?.accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
           
    
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await refreshTokenFn();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization:`Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;