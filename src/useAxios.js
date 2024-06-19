import { useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";

const useAxios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
          localStorage.clear();
          navigate("/email");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [navigate, dispatch]);

  useEffect(() => {
    return () => {
      api.interceptors.request.eject(api.interceptors.request);
      api.interceptors.response.eject(api.interceptors.response);
    };
  }, [api]);

  return api;
};

export default useAxios;
