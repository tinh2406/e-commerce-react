import { toast } from "react-toastify";
import { ForgotPasswordService } from "../../services/auth.service";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await ForgotPasswordService({
        email,
      });
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(
        JSON.stringify(error.response.data.message || error.response.data)
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="w-full p-6 sm:p-8">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          Forgot your password?
        </h2>
        {isSubmitted ? (
          <p className="text-base font-normal text-orange-400 dark:text-gray-400">
            We have sent a verify email. Please check your inbox!
          </p>
        ) : (
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Don't fret! Just type in your email and we will send you a code to
            reset your password!
          </p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-white"
              >
                I accept the
                <a
                  href="#"
                  className="text-primary-700 hover:underline dark:text-primary-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isLoading ? "Loading..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
