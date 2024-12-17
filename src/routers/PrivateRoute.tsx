import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "@/hooks/useAuth";

interface PrivateRouterProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PrivateRoute = ({ children }: PrivateRouterProps) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default PrivateRoute;
