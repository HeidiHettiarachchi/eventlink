import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getUserDetails } from "./store/slices/userSlice";

//pages
import AdminView from "./views/AdminView";
import ClientView from "./views/ClientView";
import HomeView from "./views/HomeView";
import AuthView from "./views/AuthView";
import StaffView from "./views/StaffView";

import { AuthRedirect, LoadingSpinner } from "./components";

function App() {
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
    }
  }, [dispatch, token]);

  return (
    <>
      <LoadingSpinner isLoading={user.isLoading} />
      <Routes>
        <Route path="/" Component={HomeView} />
        <Route path="/admin" Component={AdminView} />
        <Route path="/organizer" Component={ClientView} />
        <Route path="/login" Component={AuthView} />
        <Route path="/staff" Component={StaffView}/>
      </Routes>
     
    </>
  );
}

export default App;
