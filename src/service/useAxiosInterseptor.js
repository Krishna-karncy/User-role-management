import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useDispatch } from "react-redux";
import { setupAxiosInterceptors } from "./AxiosUtils"; 

const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const dispatch = useDispatch();

  useEffect(() => {
    setupAxiosInterceptors(navigate, dispatch, modal);
  }, [navigate, dispatch, modal]);
};

export default useAxiosInterceptors;
