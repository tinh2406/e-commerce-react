import { Outlet } from "react-router-dom";
import SideBar from "../components/managements/SideBar";
import Header from "../components/headers/Header";
import { useCrawler } from "../hooks/useCrawler";
import { useEffect } from "react";
import { useProductsMapper } from "../hooks/useProductsMapper";
import { useProductMapper } from "../hooks/useProductMapper";
import { useUser } from "../hooks/useUser";
import { useUserChat } from "../hooks/useUserChat";

const ManagementLayout = () => {
  const crawlerStore = useCrawler();
  const productsMapper = useProductsMapper();
  const productMapper = useProductMapper();
  const userStore = useUser();
  const userChatStore = useUserChat();
  useEffect(() => {
    crawlerStore.fetch();
    productsMapper.fetch();
    productMapper.fetch();
    userStore.fetch();
    userChatStore.fetch();
  }, []);
  return (
    <>
      <div className="shadow-sm fixed  top-0 w-full z-20 bg-white dark:bg-gray-950">
        <Header />
      </div>
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <SideBar />
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
      ˝
    </>
  );
};

export default ManagementLayout;
