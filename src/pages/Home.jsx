import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/userSlice";
import useAxios from "../useAxios";
import Sidebar from "../components/Sidebar";
import logo from "../assets/Logo.png";
import { setupSocketListeners, socketConnect } from "../redux/chatSlice";

const Home = () => {
  useSelector((state) => state.user);
  const isConnected = useSelector((state) => state.chat.connected);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const api = useAxios();

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await api.get("/user-details");
      dispatch(setUser(response.data));
      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {}
  }, [dispatch, navigate, api]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    const connectSocket = () => {
      dispatch(socketConnect());
      dispatch(setupSocketListeners());
    };

    connectSocket();

    return () => {
      //dispatch(socketDisconnect());
    };
  }, [dispatch, isConnected]);

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[300px,_1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
