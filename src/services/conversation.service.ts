import axios from "axios";
import { API_URL } from "./constants";
import { Conversation, ConversationQuery, UserChatQuery } from "./types";

export const SearchConversationsService = async (query: ConversationQuery) => {
  const response = await axios.get(`${API_URL}/conversations`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetDetailConversationService = async (
  conversation_id: string
): Promise<Conversation> => {
  const response = await axios.get(
    `${API_URL}/conversations/${conversation_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const DeleteConversationService = async (conversation_id: string) => {
  const response = await axios.delete(
    `${API_URL}/conversations/${conversation_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const UpdateConversationService = async (
  conversation_id: string,
  data: Conversation
) => {
  const response = await axios.put(
    `${API_URL}/conversations/${conversation_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const SearchUsersChatService = async (query: UserChatQuery) => {
  const response = await axios.get(`${API_URL}/conversations/list_user`, {
    params: query,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
