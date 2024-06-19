import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "./redux/userSlice";
import { useCallback, useEffect } from "react";

function App() {
  const api = useAxios();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!user.isAuthenticated && token !== null) {
        const response = await api.get("/user-details");
        dispatch(setUser(response.data));

        dispatch(setToken(token));
      }
      /* if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      } */
    } catch (error) {}
  }, [dispatch, api, user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
