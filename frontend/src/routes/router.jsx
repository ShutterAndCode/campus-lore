import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import NotFound from "../pages/NotFound.jsx";
import AuthCallback from "../pages/AuthCallback.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import { ProfilePage } from "@/profile";
import { AuthProvider } from "@/auth";
import { StoryDetailPage, CreateStoryPage, EditStoryPage } from "@/story";
import { SearchPage } from "@/search";

import AdminRoute from "./AdminRoute.jsx";

import {
  AdminLayout,
  DashboardPage,
  UsersPage,
  PostsPage,
  ReportsPage,
} from "@/admin";
export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    children: [
      // Public routes
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: "/auth/callback",
        element: <AuthCallback />,
      },
      {
        path: "/stories/:storyId",
        element: <StoryDetailPage />,
      },

      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/edit",
            element: <EditProfile />,
          },
          {
            path: "/stories/create",
            element: <CreateStoryPage />,
          },
          {
            path: "/stories/:storyId/edit",
            element: <EditStoryPage />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/users/:userId",
            element: <ProfilePage />,
          },

          /*
  |--------------------------------------------------------------------------
  | Admin Routes
  |--------------------------------------------------------------------------
  */

          {
            element: <AdminRoute />,
            children: [
              {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                  {
                    index: true,
                    element: <DashboardPage />,
                  },
                  {
                    path: "users",
                    element: <UsersPage />,
                  },
                  {
                    path: "posts",
                    element: <PostsPage />,
                  },
                  {
                    path: "reports",
                    element: <ReportsPage />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
