import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";

const AvatarUpload = () => {
  const { user, update } = useAuth();

  const editImage = (image?: string|null) => {
    update({ image: image });
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "viwwlrtz");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/nguyeqoctih/image/upload",
          formData
        );
        editImage(response.data.secure_url);
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    }
  };

  return (
    <>
      {user?.image ? (
        <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={user.image} />
      ) : (
        <div className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0 bg-gray-200">
          <svg
            className="w-28 h-28 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}
      <div>
        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          Profile picture
        </h3>
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          JPG, GIF or PNG. Max size of 800K
        </div>
        <div className="flex items-center space-x-4">
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              onFileChange(e)
              console.log(e);
              
            }}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="w-4 h-4 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
              <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
            </svg>
            Upload picture
          </label>
          {user?.image && (
            <button
              type="button"
              onClick={() => editImage(null)}
              className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AvatarUpload;
