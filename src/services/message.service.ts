import axios from "axios";
import { API_URL } from "./constants";
import { Message, MessageCreate, MessageQuery } from "./types";

export const SearchMessagesService = async (query: MessageQuery) => {
  if (!query.conversation_id) {
    return {
      data: [],
    };
  }
  const response = await axios.get(
    `${API_URL}/conversations/messages?conversation_id=${query.conversation_id}`,
    {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const SendMessageService = async (data: MessageCreate) => {
  const response = await axios.post(`${API_URL}/conversations/messages`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const GetDetailMessageService = async (
  message_id: string
): Promise<Message> => {
  const response = await axios.get(
    `${API_URL}/conversations/messages/${message_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};
