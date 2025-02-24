import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../hooks/useAuth";
import { useConversation } from "../../hooks/useConversation";
import { useMessage } from "../../hooks/useMessage";
import { LOGO_URL, UrlMapper } from "../../services/constants";
import InfiniteScroll from "../InfiniteScroll";
import MessageItem from "./MessageItem";
import { useNavigate } from "react-router-dom";

const ConversationBubble = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  const authStore = useAuth();

  useEffect(() => {
    if (isExpand) {
      messageRef.current?.scrollTo({
        top: messageRef.current?.scrollHeight,
        behavior: "instant",
      });
    }
  }, [messageRef.current, isExpand]);

  const conversationStore = useConversation();
  const messageStore = useMessage();

  useEffect(() => {
    messageRef.current?.scrollTo({
      top: messageRef.current?.scrollHeight,
      behavior: "instant",
    });
  }, [messageStore.data.length]);

  const [conversationId, setConversationId] = useState<string>();

  const [message, setMessage] = useState("");

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setMessage("");
    messageStore.add({
      content: message,
      conversation_id: conversationId,
      user_id: authStore.user?.id,
    });
  };

  useEffect(() => {
    conversationStore.fetch();
  }, []);

  useEffect(() => {
    messageStore.setQuery({ conversation_id: conversationId });
  }, [conversationId]);

  const messages = useMemo(() => {
    let messages = [];
    for (let i = messageStore.data.length - 1; i >= 0; i--) {
      messages.push(messageStore.data[i]);
    }
    return messages;
  }, [messageStore.data]);

  const navigation = useNavigate();

  useEffect(() => {
    if (
      isExpand &&
      messageStore.lastMessage &&
      messageStore.lastMessage.role === "assistant"
    ) {
      let lastMessage = messageStore.lastMessage;
      if (lastMessage?.conversation)
        setConversationId((prev) =>
          prev !== lastMessage.conversation
            ? lastMessage.conversation
            : prev
        );
      if (
        lastMessage.params?.navigates &&
        lastMessage.params.navigates.length > 0
      ) {
        if (lastMessage.params.navigates.length === 1) {
          let navigate = lastMessage.params.navigates[0];
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
            navigation(url);
            return;
          }
          if (navigate?.url === "GO_TO_PRODUCT_DETAILS") {
            navigation(UrlMapper[navigate.url] + navigate.product_id);
            return;
          }
          if (navigate?.url === "GO_TO_TRACK_ORDER") {
            navigation(UrlMapper[navigate.url] + navigate.query);
            return;
          }
          if (navigate?.url === "GO_TO_ORDER_HISTORY") {
            navigation(UrlMapper[navigate.url] + navigate.query);
            return;
          }
          if (navigate?.url) {
            navigation(UrlMapper[navigate.url]);
            return;
          }
        }
        for (let i = 1; i < lastMessage.params.navigates.length; i++) {
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
    <div
      className={twMerge([
        `fixed bottom-10 right-10 w-full transition-all
             max-w-xl bg-white shadow-xl rounded-lg overflow-hidden`,
        isExpand ? "h-[760px]" : "h-16 w-16 rounded-full",
      ])}
    >
      {isExpand ? (
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="shadow p-4 border-b h-12 flex items-center justify-between text-gray-600">
            <div className="flex gap-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <rect x="3" y="6" width="18" height="3" rx="1" />
                  <rect x="3" y="11" width="18" height="3" rx="1" />
                  <rect x="3" y="16" width="18" height="3" rx="1" />
                </svg>
              </button>
              <div>Conversations</div>
            </div>
            <button
              onClick={() => {
                setIsExpand(false);
              }}
            >
              <svg
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
              >
                <rect x="3" y="15" width="24" height="6" rx="6" />
              </svg>
            </button>
          </div>
          <div
            className={twMerge([
              "bg-white shadow absolute top-12 flex flex-col bottom-12 w-80 overflow-y-auto transition-transform",
              isMenuOpen ? "translate-x-0" : "-translate-x-full z-50",
            ])}
          >
            <div
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setConversationId(undefined);
                setIsMenuOpen(false);
              }}
            >
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center">
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
              <div className="flex flex-col ml-2">
                <div className="font-semibold">New conversation</div>
              </div>
            </div>
            {conversationStore.data.map((conversation) => (
              <div
                key={conversation.id}
                className={twMerge([
                  "flex items-center p-4 border-b cursor-pointer hover:bg-gray-100",
                  conversation.id === conversationId && "bg-gray-100",
                ])}
                onClick={() => {
                  setConversationId(conversation.id);
                  setIsMenuOpen(false);
                }}
              >
                <img className="h-8 w-8 rounded-full" src={LOGO_URL} />
                <div className="flex flex-col ml-2">
                  <div className="font-semibold">{conversation.name}</div>
                  <div className="text-sm text-gray-500 w-60 truncate">
                    {conversation.last_message_content}
                  </div>
                </div>
              </div>
            ))}
            <InfiniteScroll store={conversationStore} />
          </div>
          <div
            ref={messageRef}
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="flex flex-col flex-grow h-0 p-4 overflow-auto"
          >
            {messageStore.data.length === 0 && !messageStore.loading ? (
              <MessageItem
                message={{
                  content: "Hello, how can I help you?",
                  sender: "assistant",
                  role: "assistant",
                  conversation: "conversationId",
                  id: "tempt",
                  updated_at: new Date().toISOString(),
                  created_at: new Date().toISOString(),
                }}
              />
            ) : (
              <>
                <InfiniteScroll store={messageStore} />
                {messages.map((message) => (
                  <MessageItem message={message} key={message.id} />
                ))}
              </>
            )}
          </div>
          <div className="shadow p-1 border-t">
            <form onSubmit={handleAddMessage}>
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm focus:outline-none"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message…"
              />
            </form>
          </div>
        </div>
      ) : (
        <div
          className="rounded-full w-16 h-16 bg-primary-500 text-white flex items-center justify-center"
          onClick={() => {
            setIsExpand(true);
          }}
        >
          <svg
            className="w-8 h-8"
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
      )}
    </div>
  );
};

export default ConversationBubble;
