import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import InfiniteScroll from "../components/InfiniteScroll";
import { useAuth } from "../hooks/useAuth";
import { useConversation } from "../hooks/useConversation";
import { LOGO_URL, UrlMapper } from "../services/constants";
import { useMessage } from "../hooks/useMessage";
import { useDebounce } from "@uidotdev/usehooks";

const ConversationsOfUserLayout = () => {
  const { userId, conversationId } = useParams();

  const conversationStore = useConversation();
  const messageStore = useMessage();
  const authStore = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (userId) {
      conversationStore.setQuery({
        sender_id: userId,
      });
    } else {
      conversationStore.setQuery({
        sender_id: authStore.user?.id,
      });
    }
  }, [userId]);

  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [messageRole, setMessageRole] = useState("system");
  const [selectRoleExpand, setSelectRoleExpand] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setMessage("");
    const res = await messageStore.add({
      content: message,
      conversation_id: conversationId,
      user_id: authStore.user?.id,
      role: !userId ? "user" : messageRole === "system" ? "system" : "assistant",
    });
    if (res && res.conversation && !conversationId) {
      navigation(res.conversation);
    }
  };

  const searchDebounce = useDebounce(keyword, 500);

  useEffect(() => {
    conversationStore.setQuery({
      keyword: searchDebounce,
    });
  }, [searchDebounce]);

  useEffect(() => {
    if (
      messageStore.lastMessage &&
      messageStore.lastMessage.role === "assistant"
    ) {
      let lastMessage = messageStore.lastMessage;

      if (
        lastMessage.params?.navigates &&
        lastMessage.params.navigates.length > 0
      ) {
        for (let i = 0; i < lastMessage.params.navigates.length; i++) {
          let navigate = lastMessage.params.navigates[i];
          if (navigate?.url === "GO_TO_HOME") {
            let url = UrlMapper[navigate.url];
            Object.keys(navigate.params).forEach((key) => {
              // @ts-ignore
              const value = navigate.params[key];
              if (value === null) return;
              if (url.includes("?")) {
                url += `&${key}=${value}`;
              } else {
                url += `?${key}=${value}`;
              }
            });
            window.open(url);
          }
          if (navigate?.url === "GO_TO_PRODUCT_DETAILS") {
            window.open(UrlMapper[navigate.url] + navigate.product_id);
          }
          if (navigate?.url === "GO_TO_TRACK_ORDER") {
            window.open(UrlMapper[navigate.url] + navigate.query);
          }
          if (navigate?.url === "GO_TO_ORDER_HISTORY") {
            window.open(UrlMapper[navigate.url] + navigate.query);
          }
          if (navigate?.url) {
            window.open(UrlMapper[navigate.url]);
          }
        }
      }

      messageStore.removeNavigate();
    }
  }, [messageStore.lastMessage]);

  return (
    <>
      <div
        className="flex flex-col py-8 pl-2 pr-2  bg-white flex-shrink-0 overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div
          className="flex flex-col overflow-x-hidden"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div
            className="flex flex-col space-y-1 mt-4 gap-2 -mx-2 h-full overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            <div className="font-semibold text-lg px-4">Conversations</div>
            <div
              className={twMerge([
                "flex items-center pl-2 gap-4 justify-center rounded-md cursor-pointer",
              ])}
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Search conversation "
                  className="p-2 rounded-md border"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              {!userId && (
                <div
                  className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center"
                  onClick={() => {
                    navigation("");
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <line
                      x1="12"
                      y1="7"
                      x2="12"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="7"
                      y1="12"
                      x2="17"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
            </div>
            {conversationStore.data.map((conversation) => (
              <div
                key={conversation.id}
                className={twMerge([
                  "flex items-center p-4 rounded-md cursor-pointer hover:bg-gray-100",
                  conversation.id === conversationId && "bg-gray-100",
                ])}
                onClick={() => {
                  navigation(`${conversation.id}`);
                }}
              >
                <div className="flex flex-col ml-2">
                  <div className="font-semibold">{conversation.name}</div>
                  <div className="text-xs text-gray-500 w-60 truncate">
                    {conversation.last_message_content}
                  </div>
                </div>
                {!!conversation.un_read_count && (
                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                    {conversation.un_read_count}
                  </div>
                )}
              </div>
            ))}
            <InfiniteScroll store={conversationStore} />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto px-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <Outlet />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            {userId && (
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setSelectRoleExpand(!selectRoleExpand);
                }}
              >
                {messageRole === "system" ? (
                  <img
                    src={authStore.user?.image!}
                    className="h-8 w-8 rounded-full  hover:opacity-80"
                  />
                ) : (
                  <img
                    src={LOGO_URL}
                    className="h-8 w-8 rounded-full  hover:opacity-80"
                  />
                )}
                <div className="absolute w-40 bottom-9 z-10 shadow bg-white rounded-md h-fit transition-transform overflow-hidden">
                  <div
                    className={twMerge([
                      "flex flex-col",
                      selectRoleExpand ? "h-28" : "h-0",
                    ])}
                  >
                    <span className="px-3 pt-2 font-bold">As</span>
                    <div
                      className="flex gap-2 p-2 hover:bg-gray-100"
                      onClick={() => {
                        setMessageRole("system");
                      }}
                    >
                      <img
                        src={authStore.user?.image!}
                        className="h-6 w-6 rounded-full"
                      />
                      <span>You</span>
                    </div>
                    <div
                      className="flex gap-2 p-2 hover:bg-gray-100"
                      onClick={() => {
                        setMessageRole("assistant");
                      }}
                    >
                      <img src={LOGO_URL} className="h-6 w-6 rounded-full" />
                      <span>Bot</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConversationsOfUserLayout;
