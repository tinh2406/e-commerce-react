import { EventSource } from "extended-eventsource";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/headers/Header";
import ConversationBubble from "../components/homes/ConversationBubble";
import { useAuth } from "../hooks/useAuth";
import { useConversation } from "../hooks/useConversation";
import { useMessage } from "../hooks/useMessage";
import { API_URL } from "../services/constants";
import { ConversationUpdateEvent, NewMessageEvent } from "../services/types";

const HomeLayout = () => {
  const authStore = useAuth();
  const conversationStore = useConversation();
  const messageStore = useMessage();

  const { pathname } = useLocation();

  useEffect(() => {
    if (!authStore.token) return;

    const eventSource = new EventSource(`${API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      retry: 3000,
    });

    eventSource.onopen = () => {
      console.log("Connection opened");
    };

    eventSource.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as
        | NewMessageEvent
        | ConversationUpdateEvent;

      if (data.type === "NEW_MESSAGE") {
        messageStore.receive(data.id);
      } else if (data.type === "CONVERSATION_UPDATE") {
        conversationStore.receive(data.id);
      } else if (data.type === "CONVERSATION_NAME_CHANGE") {
        conversationStore.receive(data.id);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error in SSE connection", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [authStore.token]);

  return (
    <>
      <div className="shadow-sm fixed  top-0 w-full z-50 bg-white dark:bg-gray-950">
        <Header />
      </div>
      <div className="2xl:w-[96rem] mx-auto pt-20">
        <Outlet />
      </div>
      {authStore.user && !pathname.includes("conversations") && (
        <ConversationBubble />
      )}
    </>
  );
};

export default HomeLayout;
