import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddress } from "../hooks/useAddress";
import { useAuth } from "../hooks/useAuth";
import { useCategory } from "../hooks/useCategory";
import { useLoading } from "../hooks/useLoading";
import { useProduct } from "../hooks/useProduct";
import { useSuggestions } from "../hooks/useSuggestion";

const RootLayout = () => {
  const { isLoading } = useLoading();

  const authStore = useAuth();
  const categoryStore = useCategory();
  const addressStore = useAddress();
  const suggestionStore = useSuggestions();
  const productStore = useProduct();

  useEffect(() => {
    authStore.fetchMe();
    suggestionStore.load();
    categoryStore.fetch();
    productStore.fetch();
  }, []);

  useEffect(() => {
    if (authStore.token && authStore.user?.id) {
      addressStore.fetch({
        user_id: authStore.user?.id,
        text: undefined,
      });
    }
  }, [authStore.token]);

  return (
    <>
      <div className="min-vh-100 h-fit bg-gray-50 dark:bg-gray-900 dark:text-white">
        <Outlet />
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default RootLayout;
