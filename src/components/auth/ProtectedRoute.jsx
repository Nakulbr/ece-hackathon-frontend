import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  return sessionStorage.getItem("access_token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
