//import { Home } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";




const HomeView: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <button
        onClick={handleLoginClick}
        style={{
          background: "#3B82F6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default HomeView;
