// // import { Home } from "lucide-react";
// import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import NavBar from "../components/Navbar/Navbar";
// // import homePic from "/assets/homePic.png";

// const HomeView: React.FC = () => {
//   // const navigate = useNavigate();

//   // const handleLoginClick = () => {
//   //   navigate("/login");
//   // };

//   return (
//     <>
//       <div className="pb-4 lg:mb-36">
//         {/* <div className="flex flex-wrap lg:flex-row-reverse">
//           <div className="flex justify-center lg:p-8">
//             <img
//               src={homePic}
//               alt="alien"
//             />
//           </div>
//         </div> */}
//         <div className="w-full lg:w-1/2">
//           <div className="flex flex-col items-center lg:items-start mt-10">
//             <h2 className="pb-2 text-4xl tracking-tighter lg:text-8xl">
//               EVENT  <br /> LINK
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* <div className="container mx-auto px-8">
//         <NavBar />
//       </div> */}
//     </>
//   );
// };

// export default HomeView;


// import React from "react";
// //import NavBar from "../components/Navbar/Navbar";
// import homePic from "/assets/homePic.png";
// import "@fontsource/luckiest-guy";

// const HomeView: React.FC = () => {
//   return (
//     <>
//       {/* NavBar fixed at top */}
//       {/* <NavBar /> */}

//       {/* Hero Section */}
//       <div className="pt-24 pb-10 px-6 lg:px-20">
//         <div className="flex flex-wrap items-center justify-between">

//           {/* Text Section */}
//           <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
//             <h2
//               className="text-6xl lg:text-8xl tracking-tight"
//               style={{
//                 color: "#100944",
//                 fontFamily: "'Luckiest Guy', cursive",
//                 lineHeight: "1.1",
//               }}
//             >
//               EVENT <br /> LINK
//             </h2>
//           </div>

//           {/* Image Section */}
//           <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
//             <img
//               src={homePic}
//               alt="Linkaria"
//               className="w-3/4 max-w-md lg:max-w-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomeView;

import React from "react";
import NavBar from "../components/Navbar/NavBar";

const HomeView: React.FC = () => {

  return (


      <NavBar />
  );


};

export default HomeView;
