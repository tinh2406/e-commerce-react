import { create } from "zustand";
import {
  GetDetailConversationService,
  SearchConversationsService,
} from "../services/conversation.service";
import { ConversationPreview, ConversationQuery } from "../services/types";
import { Actions, DataPagingList } from "./type";

interface ConversationStore
  extends DataPagingList<ConversationPreview>,
    Actions {
  query: ConversationQuery;
  setQuery: (query: ConversationQuery) => void;
  setPage: (page: number) => void;
  receive: (conversationId: string) => void;
}

export const useConversation = create<ConversationStore>((set, get) => ({
  data: [],
  page: 1,
  page_size: 10,
  page_count: undefined,
  item_count: 0,
  loading: false,
  query: {
    page: 1,
    page_size: 10,
    is_deleted: false,
  },
  async receive(conversationId: string) {
    const data = await GetDetailConversationService(conversationId);
    let oldData = get().data.filter((item) => item.id !== conversationId);
    set({
      data: [
        {
          id: data.id,
          name: data.name,
          created_at: data.created_at,
          updated_at: data.updated_at,
          sender_id: data.sender.id,
          last_message_id: data.last_message?.id,
          last_message_content: data.last_message?.content,
          un_read_count: data.un_read_count,
        },
        ...oldData,
      ],
    });
  },
  setPage: (page: number) => {
    set({ query: { ...get().query, page } });
    get().fetch();
  },
  setQuery: (query: ConversationQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    set({ loading: true });
    try {
      const response = await SearchConversationsService(get().query);
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
  add() {},
  update() {},
  delete() {},
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
        is_deleted: false,
      },
    });
  },
}));
