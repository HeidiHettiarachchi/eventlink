// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
// import { getUserDetails } from "./store/slices/userSlice";

// // pages
// import AdminView from "./views/AdminView";
// import ClientView from "./views/ClientView";
// import HomeView from "./views/HomeView";
// import AuthView from "./views/AuthView";
// import StaffView from "./views/StaffView";

// import {  LoadingSpinner } from "./components";

// function App() {
//   const token = localStorage.getItem("token");

//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user);

//   useEffect(() => {
//     if (token) {
//       dispatch(getUserDetails());
//     }
//   }, [dispatch, token]);

//   return (

//     <>
//       { /* </>Background Section */ }
//       <div className="overflow-x-hidden text-stone-300 antialiased">
//         <div className="fixed inset-0 -z-10">
//           <div className="absolute inset-0 -z-10 h-full w-full bg-[#C9EBFF] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:6rem_4rem]">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,rgba(255,255,255,0.2),transparent)]"></div>
//           </div>
//         </div>
   

//         {/* Main Content Section */}
//         <LoadingSpinner isLoading={user.isLoading} />
//         <Routes>
//           <Route path="/" element={<HomeView />} />
//           <Route path="/admin" element={<AdminView />} />
//           <Route path="/organizer" element={<ClientView />} />
//           <Route path="/login" element={<AuthView />} />
//           <Route path="/staff" element={<StaffView />} />
//         </Routes>
//         </>  
  
//   );
// }

// export default App;



//new code

// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
// import { getUserDetails } from "./store/slices/userSlice";

// // pages
// import AdminView from "./views/AdminView";
// import ClientView from "./views/ClientView";
// import HomeView from "./views/HomeView";
// import AuthView from "./views/AuthView";
// import StaffView from "./views/StaffView";

// //components 
// import { LoadingSpinner } from "./components";
// import NavBar from "./components/Navbar/Navbar";

// //bg styles
// import "./App.css"; 

// function App() {
//   const token = localStorage.getItem("token");

//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user);

//   useEffect(() => {
//     if (token) {
//       dispatch(getUserDetails());
//     }
//   }, [dispatch, token]);

//   return (
    

//     <div >
//     <NavBar />
      
//       {/* Background animation */}

//       <div className="area">
//           <ul className="circles">
//             <li></li><li></li><li></li><li></li><li></li>
//             <li></li><li></li><li></li><li></li><li></li>
//           </ul>
//         </div> 

// {/* <div className="overflow-x-hidden text-stone-300 antialiased">
//         <div className="fixed inset-0 -z-10">
//           <div className="absolute inset-0 -z-10 h-full w-full bg-[#C9EBFF] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:6rem_4rem]">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,rgba(255,255,255,0.2),transparent)]"></div>
//          </div>
//         </div> */}
  
       
       

//         {/* Main content */}
//         <div className="relative z-10 overflow-x-hidden text-stone-300 antialiased">
//           <LoadingSpinner isLoading={user.isLoading} />
//           <Routes>
//             <Route path="/" element={<HomeView />} />
//             <Route path="/admin" element={<AdminView />} />
//             <Route path="/organizer" element={<ClientView />} />
//             <Route path="/login" element={<AuthView />} />
//             <Route path="/staff" element={<StaffView />} />
//           </Routes>
//         </div>
//         </div>

    
//     );
//   }
  


// export default App;


//new new code

// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
// import { getUserDetails } from "./store/slices/userSlice";

// // pages
// import AdminView from "./views/AdminView";
// import ClientView from "./views/ClientView";
// import HomeView from "./views/HomeView";
// import AuthView from "./views/AuthView";
// import StaffView from "./views/StaffView";

// // components
// import { LoadingSpinner } from "./components";
// import NavBar from "./components/Navbar/Navbar";

// // bg styles
// //import "./App.css"; 

// function App() {
//   const token = localStorage.getItem("token");
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user);

//   useEffect(() => {
//     if (token) {
//       dispatch(getUserDetails());
//     }
//   }, [dispatch, token]);

//   return (

   

//     <div className="relative min-h-screen overflow-x-hidden text-stone-300 antialiased">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 h-full w-full bg-[#C9EBFF] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:6rem_4rem]">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,rgba(255,255,255,0.2),transparent)]"></div>
//         </div>

//         <div className="bg-red-500 text-white p-4">Tailwind Test Box</div>

//       </div>

//       {/* Navbar */}
//       <NavBar />

//       {/* Main Content - add top padding to avoid overlapping the fixed navbar */}
//       <div className="relative z-10 pt-20">
//         <LoadingSpinner isLoading={user.isLoading} />
//         <Routes>
//           <Route path="/" element={<HomeView />} />
//           <Route path="/admin" element={<AdminView />} />
//           <Route path="/organizer" element={<ClientView />} />
//           <Route path="/login" element={<AuthView />} />
//           <Route path="/staff" element={<StaffView />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App; 

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

// components
import { LoadingSpinner } from "./components";

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
      </Routes>
    </div>

    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>


</>
  );
}

export default App;
