import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFound from "./pages/NotFound.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import Security from "./pages/users/Security.tsx";
import HistoryActivity from "./pages/users/HistoryActivity.tsx";
import Notification from "./pages/users/Notification.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Profile from "./pages/users/Profile.tsx";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/managements/Dashboard.tsx";
import ManagementLayout from "./layouts/ManagementLayout.tsx";
import Products from "./pages/managements/Products.tsx";
import Categories from "./pages/managements/Categories.tsx";
import Users from "./pages/managements/Users.tsx";
import CrawlerSettings from "./pages/managements/CrawlerSetting.tsx";
import ProductMapper from "./pages/managements/ProductMapper.tsx";
import ProductsMapper from "./pages/managements/ProductsMapper.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import ConversationLayout from "./layouts/ConversationLayout.tsx";
import ConversationsOfUserLayout from "./layouts/ConversationsOfUserLayout.tsx";
import Conversations from "./pages/Conversations.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password/:token", element: <ResetPassword /> },
        ],
      },
      {
        path: "/management",
        element: <ManagementLayout />,
        children: [
          {
            path: "conversations",
            element: <ConversationLayout />,
            children: [
              {
                path: ":userId",
                element: <ConversationsOfUserLayout />,
                children: [
                  {
                    path: ":conversationId",
                    element: <Conversations />,
                  },
                  {
                    path: "",
                    element: (
                      <div className="flex items-center justify-center h-full w-full">
                        <span className="text-gray-500 font-semibold text-lg">
                          Select a conversation
                        </span>
                      </div>
                    ),
                  },
                ],
              },
              {
                path: "",
                element: (
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-gray-500 font-semibold text-lg">
                      Select a user
                    </span>
                  </div>
                ),
              },
            ],
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "settings",
            element: <CrawlerSettings />,
          },
          {
            path: "settings/product-mappers",
            element: <ProductMapper />,
          },
          {
            path: "settings/details-mappers",
            element: <ProductsMapper />,
          },
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            path: "/conversations",
            element: (
              <div className="flex h-[calc(100vh-84px)]">
                <ConversationsOfUserLayout />
              </div>
            ),
            children: [
              {
                path: ":conversationId",
                element: <Conversations />,
              },
              {
                path: "",
                element: (
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-gray-500 font-semibold text-lg">
                      Select or start new conversation
                    </span>
                  </div>
                ),
              },
            ],
          },
          {
            path: "/user",
            element: <UserLayout />,
            children: [
              {
                path: "security",
                element: <Security />,
              },
              {
                path: "history-activity",
                element: <HistoryActivity />,
              },
              {
                path: "notifications",
                element: <Notification />,
              },
              {
                path: "",
                element: <Profile />,
              },
            ],
          },
          {
            path: "/products/:id",
            element: <ProductDetail />,
          },
          {
            path: "",
            element: <Home />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
