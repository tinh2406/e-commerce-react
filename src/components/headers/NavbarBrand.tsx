import { Link } from "react-router-dom";
import { LOGO_URL } from "../../services/constants";

const NavbarBrand = () => {
  return (
    <>
      <Link to="/" className="flex items-center gap-2">
        <img alt="Logo" src={LOGO_URL} width="36" height="36" loading="lazy" />
        <strong className="hidden lg:block text-lg">E-commerce</strong>
      </Link>
    </>
  );
};

export default NavbarBrand;
