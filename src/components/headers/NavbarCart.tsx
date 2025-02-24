import { Link } from "react-router-dom";

const NavbarCart = () => {
  return (
    <div className="flex items-center rounded-md hover:bg-gray-100 hover:text-gray-700 cursor-pointer px-2">
      <Link to="/cart" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="currentColor"
        >
          <path d="M7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2c1.1 0 2-.9 2-2s-.9-2-2-2zm0-2h14v-2H8l-1-5H2V7h4l1.25 6h12.02L20.83 7H7V4H5v2h1.97l1.71 8H7v2zm10 2c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
        </svg>
      </Link>
    </div>
  );
};

export default NavbarCart;
