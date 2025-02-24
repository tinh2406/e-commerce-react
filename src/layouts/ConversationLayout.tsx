import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserChat } from "../hooks/useUserChat";
import InfiniteScroll from "../components/InfiniteScroll";
import { twMerge } from "tailwind-merge";

const ConversationLayout = () => {
  const userChatStore = useUserChat();
  const navigation = useNavigate();
  const location = useLocation();
  return (
    <div className="flex h-[calc(100dvh-88px)] antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 border-r">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">Conversations</div>
          </div>
          <div className="flex flex-col">
            <div
              className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
              }}
            >
              {userChatStore.data.map((user) => (
                <button
                  className={twMerge([
                    "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2",
                    location.pathname.includes(`${user.id}`) && "bg-gray-100",
                    ,
                  ])}
                  key={user.id}
                  onClick={() => {
                    navigation(`${user.id}`);
                  }}
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      {user.name[0]}
                    </div>
                  )}
                  <div className="ml-2 text-sm font-semibold">{user.name}</div>
                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-gray-500 h-4 w-4 rounded leading-none">
                    {user.conversation_count}
                  </div>
                </button>
              ))}
              <InfiniteScroll store={userChatStore} />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ConversationLayout;
