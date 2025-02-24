import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { UserDetail } from "../../services/types";
import GenderSelect from "./GenderSelect";
import RoleSelect from "./RoleSelect";

const GeneralInfo = () => {
  const { user, update } = useAuth();

  const [editableUser, setEditableUser] = useState<Partial<UserDetail>>({
    name: user?.name,
    phone: user?.phone,
    birthday: user?.birthday,
    gender: user?.gender,
    role: user?.role,
  });

  useEffect(() => {
    setEditableUser({
      name: user?.name,
      phone: user?.phone,
      birthday: user?.birthday,
      gender: user?.gender,
      role: user?.role,
    });
  }, [user]);

  console.log(editableUser);

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    update(editableUser);
  };

  const createdAt = useMemo(() => {
    return user?.created_at && new Date(user.created_at).toLocaleString();
  }, [user]);
  const updatedAt = useMemo(() => {
    return user?.updated_at && new Date(user.updated_at).toLocaleString();
  }, [user]);
  const bannedAt = useMemo(() => {
    return user?.banned_at && new Date(user.banned_at).toLocaleString();
  }, [user]);
  const deletedAt = useMemo(() => {
    return user?.deleted_at && new Date(user.deleted_at).toLocaleString();
  }, [user]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        General information
      </h3>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={editableUser.name}
              onChange={(e) =>
                setEditableUser({ ...editableUser, name: e.target.value })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Bonnie"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={user?.email}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="example@company.com"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="phone-number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              value={editableUser?.phone || ""}
              onChange={(e) =>
                setEditableUser({ ...editableUser, phone: e.target.value })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="e.g. +(12)3456 789"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="birthday"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <GenderSelect
              value={editableUser?.gender || ""}
              setValue={(value) =>
                setEditableUser({ ...editableUser, gender: value })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <RoleSelect
              value={String(editableUser.role)}
              setValue={(value) =>
                setEditableUser({ ...editableUser, role: Number(value) })
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="created-at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Created at
            </label>
            <input
              type="text"
              name="created-at"
              value={createdAt}
              disabled
              id="created-at"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Null"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="updated-at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Updated at
            </label>
            <input
              type="text"
              disabled
              value={updatedAt}
              id="updated-at"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Null"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="ban-at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ban at
            </label>
            <input
              type="text"
              name="ban-at"
              disabled
              value={bannedAt}
              id="ban-at"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Null"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="deleted-at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Deleted at
            </label>
            <input
              type="text"
              value={deletedAt}
              name="deleted-at"
              disabled
              id="deleted-at"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Null"
              required
            />
          </div>
          <div className="col-span-6 sm:col-full">
            <button
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Save all
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
