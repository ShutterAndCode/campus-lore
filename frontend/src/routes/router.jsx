import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import NotFound from "../pages/NotFound.jsx";
import AuthCallback from "../pages/AuthCallback.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
  { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
],
  },
]);