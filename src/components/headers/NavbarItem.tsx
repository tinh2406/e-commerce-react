import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem = ({ label, to }: NavbarItemProps) => {
  return (
    <div className="nav-item cursor-pointer" v-if="isAuthenticated">
      <Link
        className={twMerge(["p-2 rounded-md hover:bg-gray-100 text-lg"])}
        to={to}
        aria-current="page"
      >
        {label}
      </Link>
    </div>
  );
};

export default NavbarItem;
