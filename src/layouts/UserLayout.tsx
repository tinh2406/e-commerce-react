import { Link, Outlet, useLocation } from "react-router-dom";

const routers = [
  {
    to: "/user",
    title: "Public Profile",
  },
  {
    to: "/user/security",
    title: "Account Settings",
  },
  {
    to: "/user/history-activity",
    title: "History & Activity",
  },
  {
    to: "/user/notifications",
    title: "Notifications",
  },
];

const UserLayout = () => {
  const pathName = useLocation().pathname;

  return (
    <div className="grid grid-cols-6 min-h-[100vh]">
      <aside className="hidden py-4 md:block col-span-1 sticky shadow top-24 bg-white h-[90vh] rounded-md">
        <div className="sticky flex flex-col gap-2 p-4 text-sm top-28">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          {routers.map((router) => (
            <Link
              key={router.to}
              to={router.to}
              className={`flex items-center px-3 py-2.5 font-semibold hover:bg-slate-100 rounded-md ${
                pathName === router.to && "text-indigo-900 bg-slate-100"
              }`}
            >
              {router.title}
            </Link>
          ))}
          <button
            className={`flex items-center px-3 py-2.5 font-semibold hover:bg-slate-100 rounded-md`}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="w-full col-span-5">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
