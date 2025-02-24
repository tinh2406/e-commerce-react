import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");

  const authStore = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    authStore.login(email, password);
  };

  return (
    <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Sign in to platform
      </h2>
      <form className="mt-8 space-y-6 w-full" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="flex-grow py-2 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login to your account
          </button>
        </div>
        <div className="w-full flex text-sm font-medium text-gray-500 dark:text-gray-400 justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-primary-700 hover:underline dark:text-primary-500"
          >
            Lost Password?
          </Link>
          <span>
            Not registered?
            <Link
              to="/register"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Create account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
