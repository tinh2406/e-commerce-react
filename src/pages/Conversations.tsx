import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import MessageItem from "../components/homes/MessageItem";
import InfiniteScroll from "../components/InfiniteScroll";
import { useMessage } from "../hooks/useMessage";

const Conversations = () => {
  const messageStore = useMessage();

  const { conversationId } = useParams();

  useEffect(() => {
    if (conversationId)
      messageStore.setQuery({ conversation_id: conversationId });
  }, [conversationId]);

  const messages = useMemo(() => {
    let messages = [];
    for (let i = messageStore.data.length - 1; i >= 0; i--) {
      messages.push(messageStore.data[i]);
    }
    return messages;
  }, [messageStore.data, conversationId]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
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
    </div>
  );
};

export default Conversations;
