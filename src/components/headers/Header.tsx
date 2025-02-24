import { useAuth } from "../../hooks/useAuth";
import NavbarAvatar from "./NavbarAvatar";
import NavbarBrand from "./NavbarBrand";
import NavbarCart from "./NavbarCart";
import NavbarItem from "./NavbarItem";
import ProductSearch from "./ProductSearch";

export default () => {
  const authStore = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 w-full 2xl:w-[96rem] mx-auto">
      <NavbarBrand />
      <ProductSearch />
      <div className="flex items-center gap-2">
        {authStore.user &&
          (authStore.user?.role === 3 ? (
            <NavbarItem label="Conversations" to="/conversations" />
          ) : (
            <NavbarItem label="Management" to="/management" />
          ))}
        <NavbarCart />
        <NavbarAvatar />
      </div>
    </nav>
  );
};
