import { create } from "zustand";
import { SearchConversationsService } from "../services/conversation.service";
import {
  GetDetailMessageService,
  SearchMessagesService,
  SendMessageService,
} from "../services/message.service";
import { Message, MessageCreate, MessageQuery } from "../services/types";
import { Actions, DataPagingList } from "./type";

interface MessageStore extends DataPagingList<Message>, Actions {
  query: MessageQuery;
  setQuery: (query: MessageQuery) => void;
  setPage: (page: number) => void;
  fetch: () => void;
  receive: (messageId: string) => void;
  add: (message: MessageCreate) => Promise<Message | undefined>;
  removeNavigate: () => void;
  lastMessage: Message | undefined;
}

export const useMessage = create<MessageStore>((set, get) => ({
  data: [],
  page: 1,
  page_size: 10,
  page_count: undefined,
  lastMessage: undefined,
  item_count: 0,
  loading: false,
  query: {
    page: 1,
    page_size: 10,
  },
  navigate: undefined,
  setPage: (page: number) => {
    set({ query: { ...get().query, page } });
    get().fetch();
  },
  setQuery: (query: MessageQuery) => {
    set({ query: { ...get().query, ...query, page: 1 }, data: [] });
    get().fetch();
  },
  removeNavigate() {
    set({ lastMessage: undefined });
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchMessagesService(get().query);

      set({
        data: response.data,
        page: response.page,
        page_size: response.page_size,
        page_count: response.page_count,
        item_count: response.item_count,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  async loadNextPage() {
    const isLoading = get().loading;
    const page = get().page;
    const page_count = get().page_count;
    if (isLoading) return;
    if (page_count && page < page_count) {
      set({ query: { ...get().query, page: page + 1 }, loading: true });

      try {
        const response = await SearchConversationsService(get().query);
        set({
          data: [...get().data, ...response.data],
          page: response.page,
          page_size: response.page_size,
          page_count: response.page_count,
          item_count: response.item_count,
          loading: false,
        });
      } catch (error) {
        set({ loading: false });
      }
    }
  },
  async add(message: MessageCreate) {
    try {
      set({
        data: [
          {
            id: "temp",
            content: message.content,
            conversation: message.conversation_id || "tempt",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            sender: message.user_id,
          },
          ...get().data,
        ],
      });
      const res = await SendMessageService(message);

      set({
        data: get().data.map((item) =>
          item.id === "temp" ? { ...res, id: res.id } : item
        ),
      });
      if (!get().query.conversation_id) {
        set({
          query: {
            ...get().query,
            conversation_id: res.conversation,
          },
        });
      }
      return res;
    } catch (error) {
      set({
        data: get().data.filter((item) => item.id !== "temp"),
      });
    }
  },
  update() {},
  delete() {},
  async receive(messageId: string) {
    try {
      const res = await GetDetailMessageService(messageId);

      if (res.conversation === get().query.conversation_id) {
        set({ data: [res, ...get().data], lastMessage: res });
      }
    } catch (error) {}
  },
  resetState() {
    set({
      data: [],
      page: 1,
      page_size: 10,
      page_count: undefined,
      item_count: 0,
      loading: false,
      query: {
        page: 1,
        page_size: 10,
      },
    });
  },
}));
