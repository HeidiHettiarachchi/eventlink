
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { getUserDetails } from "./store/slices/userSlice";

// pages
import AdminView from "./views/AdminView";
import ClientView from "./views/ClientView";
import HomeView from "./views/HomeView";
import AuthView from "./views/AuthView";
import StaffView from "./views/StaffView";
import EventView from "./views/EventView/EventView";
import ClubsView from "./views/Clubs/ClubsView";


// components
import { LoadingSpinner } from "./components";
import Footer from "./components/Footer/Footer";


//fonts



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
    <div>
      
      <LoadingSpinner isLoading={user.isLoading} />

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/organizer" element={<ClientView />} />
        <Route path="/login" element={<AuthView />} />
        <Route path="/staff" element={<StaffView />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/clubs" element={<ClubsView />} />
        
      </Routes>
    </div>

    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>


<Footer />

</>
  );
}

export default App;
