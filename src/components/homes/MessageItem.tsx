import { marked } from "marked";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LOGO_URL, UrlMapper } from "../../services/constants";
import { Message } from "../../services/types";

const MessageItem = ({ message }: { message: Message }) => {
  const authStore = useAuth();

  const navigation = useNavigate();
  const { pathname } = useLocation();

  const timeString = useMemo(() => {
    if (!message.created_at) {
      return "";
    }
    const dateLength = Date.now() - new Date(message.created_at).getTime();
    if (dateLength < 60000) {
      return "Just now";
    }
    if (dateLength < 3600000) {
      return `${Math.floor(dateLength / 60000)} min ago`;
    }
    if (dateLength < 86400000) {
      return `${Math.floor(dateLength / 3600000)} hours ago`;
    }
    return `${Math.floor(dateLength / 86400000)} days ago`;
  }, [message.created_at]);

  const messageParams = useMemo(() => {
    return message.params;
  }, [message]);

  const extraInfo = useMemo(() => {
    if (!messageParams) return null;
    if (!messageParams.navigates) return null;

    if (messageParams.navigates.length > 0)
      return (
        <span className="text-sm text-primary-500">
          Hãy click vào đây nếu hệ thống không tự chuyển hướng.
        </span>
      );
  }, [messageParams]);

  const createMarkup = () => {
    if (message.content) {
      return { __html: marked(message.content) };
    }
    return { __html: "" };
  };

  if (message.sender !== authStore.user?.id) {
    return (
      <div
        className="flex w-full mt-2 space-x-3 max-w-xs"
        onClick={() => {
          if (message.role === "assistant") {
            let lastMessage = message;
            if (
              lastMessage.params?.navigates &&
              lastMessage.params.navigates.length > 0
            ) {
              if (pathname.includes("conversations")) {
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
              } else {
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
            }
          }
        }}
      >
        {message.role === "assistant" ? (
          <img className="h-8 w-8 rounded-full" src={LOGO_URL} />
        ) : (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="40"
              height="40"
              fill="none"
              stroke="gray"
              strokeWidth="3"
            >
              <circle cx="32" cy="20" r="10" />
              <path d="M16 50c0-8 8-14 16-14s16 6 16 14v4H16v-4z" />
            </svg>
          </div>
        )}
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm" dangerouslySetInnerHTML={createMarkup()} />
            {extraInfo}
          </div>
          <span className="text-xs text-gray-500 leading-none">
            {timeString}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm" dangerouslySetInnerHTML={createMarkup()} />
        </div>
        <span className="text-xs text-gray-500 leading-none">{timeString}</span>
      </div>
    </div>
  );
};

export default MessageItem;
