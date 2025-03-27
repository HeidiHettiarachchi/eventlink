import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getUserDetails } from "./store/slices/userSlice";

import AdminView from "./views/AdminView";
import ClientView from "./views/ClientView";
import AuthView from "./views/AuthView";
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
        <Route path="/" Component={AuthView} />
        <Route path="/admin" Component={AdminView} />
        <Route path="/client" Component={ClientView} />
      </Routes>
      <AuthRedirect />
    </>
  );
}

export default App;
