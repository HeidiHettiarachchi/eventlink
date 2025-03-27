import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "../../types";
import { useAppSelector } from "../../hooks/reduxHooks";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken: IDecodedToken = jwtDecode(token);
      if (decodedToken?.role === "admin") {
        navigate("/admin");
      } else if (decodedToken?.role === "client") {
        navigate("/client");
      }
    } else {
      navigate("/");
    }
  }, [token, navigate, user.error]);

  return null;
};

export default AuthRedirect;
