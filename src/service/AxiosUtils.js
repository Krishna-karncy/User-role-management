import axios from "axios";
import { logout } from "../redux/slice/AuthSlice";

const apiUrl = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});


let isSessionExpired = false;

export const setupAxiosInterceptors = (
  navigate, 
  dispatch, 
  modal
) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {

        if (error.response?.status === 401) {
          if (!isSessionExpired) {
            isSessionExpired = true;

            modal.warning({
              title: "Your session has expired.",
              content: "Please log in again.",
            });

            dispatch(logout());
            navigate("/login");

            setTimeout(() => {
              isSessionExpired = false;
            }, 1000);

          return Promise.reject(new Error("Unauthorized, session expired"));
        }

        throw new Error(error.response?.data.error || "An error occurred");
      }

      return Promise.reject(error);
    }
  );
};
