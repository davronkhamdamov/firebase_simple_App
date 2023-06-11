import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

export const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
