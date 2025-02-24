import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGO_URL } from "../services/constants";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const AuthLayout = () => {
  const authStore = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.user) {
      navigate("/");
    }
  }, [authStore.user]);

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <Link
        to="/"
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <img src={LOGO_URL} className="mr-4 h-11" alt="Logo" />
        <span>E-commerce</span>
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
