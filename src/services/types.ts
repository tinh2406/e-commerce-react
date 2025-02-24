export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export interface Register {
  name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface UserPreview {
  id: string;
  name: string;
  email: string;
  birthday?: string;
  phone?: string;
  gender?: number;
  gender_name?: string;
  image?: string;
  role?: number;
  role_name?: string;
  created_at?: string;
  deleted_at?: string;
  banned_at?: string;
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  birthday?: string | null;
  phone?: string | null;
  gender?: string | null;
  gender_name?: string;
  image?: string | null;
  role: number;
  role_name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  banned_at?: string;
}

export interface UserUpdate {
  name?: string | null;
  phone?: string | null;
  birthday?: string | null;
  gender?: string | null;
  image?: string | null;
  role?: number | null;
}

export interface PasswordUpdate {
  old_password: string;
  new_password: string;
  re_new_password: string;
}

export interface DataPagingList<T> {
  data: T[];
  page: number;
  page_size: number;
  page_count?: number;
  item_count: number;
  loading: boolean;
  error: any;
}

export interface CategoryQuery {
  keyword?: string;
  parent_id?: string;
  is_deleted?: boolean;
  created_from?: Date;
  created_to?: Date;
  delete_from?: Date;
  delete_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
  parent?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface CategoryCreate {
  name: string;
  parent_id?: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  hot_price?: number;
  category_id: string;
  thumbnail: string;
  images?: string[];
  attributes?: Attribute[];
  variants?: Variant[];
}

export interface ProductQuery {
  keyword?: string;
  category_id?: string;
  is_deleted?: boolean;
  created_from?: Date;
  created_to?: Date;
  price_from?: number;
  price_to?: number;
  delete_from?: Date;
  delete_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface ProductPreview {
  id: string;
  name: string;
  description: string;
  price: number;
  hot_price?: number;
  category_id: string;
  thumbnail: string;
  created_at?: string;
  deleted_at?: string;
  is_like?: boolean;
}

export interface ProductDetail extends ProductPreview {
  updated_at?: string;
  category?: string;
  images?: string[];
  attributes?: Record<string, string[]>;
  variants?: {
    hot_price: number;
    price: number;
    stock: number;
    image: string;
    attributes: Record<string, string>;
  }[];
  is_like?: boolean;
}

export interface Attribute {
  name: string;
  values: string[];
}
export interface Variant {
  price: number;
  hot_price: number;
  image: string;
  [key: string]: string | number;
}
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  hot_price?: number;
  category_id: string;
  thumbnail: string;
  images?: string[];
  attributes?: Attribute[];
  variants?: Variant[];
}

export interface ProductsMapper {
  id: string;
  deleted_at?: string;
  created_at: string;
  updated_at?: string;
  name: string;
  data: string;
  primary_key: string;
  total: string;
  total_page: string;
  take: string;
  page: string;
}

export interface ProductsMapperCreate {
  name: string;
  data: string;
  primary_key: string;
  total: string;
  total_page: string;
  take: string;
  page: string;
}

export interface ProductMapper {
  id: string;
  deleted_at?: string;
  created_at: string;
  updated_at?: string;
  name: string;

  product_id: string;
  product_name: string;
  product_description: string;
  product_price: string;
  product_hot_price: string;
  product_created_at: string;
  product_updated_at?: string;
  product_deleted_at: string;
  product_thumbnail: string;
  product_category_id: string;
  product_category_name: string;
  product_images: string;
  product_images_name: string;
  attributes: string;
  attribute_code: string;
  attribute_name: string;
  attribute_values: string;
  attribute_value_name: string;
  variants: string;
  variant_price: string;
  variant_hot_price: string;
  variant_image: string;
}

export interface ProductMapperCreate {
  name: string;

  product_id: string;
  product_name: string;
  product_description: string;
  product_price: string;
  product_hot_price: string;
  product_created_at: string;
  product_updated_at?: string;
  product_deleted_at: string;
  product_thumbnail: string;
  product_category_id: string;
  product_category_name: string;
  product_images: string;
  product_images_name: string;
  attributes: string;
  attribute_code: string;
  attribute_name: string;
  attribute_values: string;
  attribute_value_name: string;
  variants: string;
  variant_price: string;
  variant_hot_price: string;
  variant_image: string;
}

export interface CrawlerPreview {
  id: string;
  name: string;
  args: string;
  kwargs: string;
  enabled: boolean;
  last_run_at: string;
  date_changed: string;
  total_run_count: number;
  start_time: string;
  expires: string;
  interval?: {
    every: number;
    period: string;
  };
  crontab?: {
    minute: string;
    hour: string;
    day_of_week: string;
    day_of_month: string;
    month_of_year: string;
  };
}

export interface CrawlerDetail {
  id: string;
  name: string;
  enabled: boolean;
  task: string;
  last_run_at: string;
  date_changed: string;
  total_run_count: number;
  start_time: string;
  expires: string;
  interval?: {
    every: number;
    period: string;
  };
  crontab?: {
    minute: string;
    hour: string;
    day_of_week: string;
    day_of_month: string;
    month_of_year: string;
  };
  kwargs: {
    url: string;
    detail_url: string;
    quantity: number;
    request_params_id: string;
    products_mapper_id: string;
    product_mapper_id: string;
  };
  params: {
    take_key: string;
    page_key: string;
    [key: string]: string | number;
  };
  headers: Record<string, string>;
}

export interface CrawlerQuery {
  keyword?: string;
  is_running?: boolean;
  last_run_from?: Date;
  last_run_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

interface Params {
  take_key: string;
  page_key: string;
  [key: string]: string | number;
}
export interface CrawlerCreate {
  url: string;
  detail_url: string;
  name: string;
  quantity: number;
  start_time: string;
  end_time: string;
  cycle_length?: number;
  every?: "minute" | "hour" | "day" | "month" | "year";
  product_mapper_id: string;
  products_mapper_id: string;
  params: Params;
  headers: Record<string, string>;
}

export interface MapperQuery {
  keyword?: string;
  is_deleted?: boolean;
  created_from?: Date;
  created_to?: Date;
  delete_from?: Date;
  delete_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface Address {
  id: string;
  city: string;
  district: string;
  ward: string;
  detail: string;
  city_detail: string;
  district_detail: string;
  ward_detail: string;
}

export interface AddressCreate {
  city: string;
  district: string;
  ward: string;
  detail: string;
}

export interface QueryAddress {
  user_id: string;
  text?: string;
}

export interface City {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}
export interface Ward {
  id: string;
  name: string;
}

export interface UserQuery {
  keyword?: string;
  role?: string;
  gender?: string;
  is_all?: boolean;
  is_deleted?: boolean;
  is_banned?: boolean;
  created_from?: Date;
  created_to?: Date;
  banned_from?: Date;
  banned_to?: Date;
  delete_from?: Date;
  delete_to?: Date;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface ConversationPreview {
  id: string;
  name: string;
  sender_id: string;
  last_message_id?: string;
  last_message_content?: string;
  created_at: string;
  updated_at: string;
  un_read_count?: number;
}

export interface MessagePreview {
  id: string;
  content: string;
  type?: string;
  params?: string;
  conversation_id: string;
  sender_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  role?: string;
  content: string;
  type?: string;
  params?: MessageParamsType;
  conversation: string;
  sender?: string;
}

export interface Conversation {
  id: string;
  last_message?: MessagePreview;
  sender: UserPreview;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  name: string;
  un_read_count?: number;
}

export interface ConversationQuery {
  keyword?: string;
  is_deleted?: boolean;
  delete_from?: Date;
  delete_to?: Date;
  created_from?: Date;
  created_to?: Date;
  sender_id?: string;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface MessageQuery {
  conversation_id?: string;
  keyword?: string;
  page_size?: number;
  page?: number;
}

export interface MessageCreate {
  conversation_id?: string;
  content: string;
  role?: "assistant" | "user" | "system";
  type?: string;
  user_id?: string;
}

export interface NewMessageEvent {
  id: string;
  type: "NEW_MESSAGE";
}
export interface ConversationUpdateEvent {
  id: string;
  type: "CONVERSATION_UPDATE" | "CONVERSATION_NAME_CHANGE";
}

interface ProductListParamsType {
  url: "GO_TO_HOME";
  params: {
    keyword?: string;
    category_name?: string;
    price_from?: number;
    price_to?: number;
    order_by?: string;
    order_type?: string;
  };
}
interface ProductDetailParamsType {
  url: "GO_TO_PRODUCT_DETAILS";
  product_id: string;
}
interface TrackOrderHistoryParamsType {
  url: "GO_TO_TRACK_ORDER";
  query: any;
}
interface SearchHistoryParamsType {
  url: "GO_TO_ORDER_HISTORY";
  query: any;
}
interface OtherParamsType {
  url:
    | "GO_TO_PROFILE"
    | "GO_TO_SETTINGS"
    | "GO_TO_LOGOUT"
    | "GO_TO_NOTIFICATION_SETTINGS"
    | "GO_TO_PASSWORD_SETTINGS"
    | "GO_TO_PRIVACY_SETTINGS"
    | "GO_TO_LANGUAGE_SETTINGS"
    | "GO_TO_CART"
    | "GO_TO_WISHLIST";
}

export type MessageParamsType = {
  actions: any[];
  navigates: (
    | ProductListParamsType
    | ProductDetailParamsType
    | TrackOrderHistoryParamsType
    | SearchHistoryParamsType
    | OtherParamsType
  )[];
};

export interface UserChatQuery {
  keyword?: string;
  order_by?: string;
  order_type?: string;
  page_size?: number;
  page?: number;
}

export interface UserChat {
  id: string;
  name: string;
  conversation_count: number;
  image?: string;
  banned_at?: string;
  deleted_at?: string;
}

export interface StatisticQuery {
  cycle: "day" | "week" | "month" | "quarter" | "year";
  num_cycle?: number;
  start_date?: string;
  end_date?: string;
}

export type StatisticResponse = {
  range_label: string;
  count: number;
}[];
