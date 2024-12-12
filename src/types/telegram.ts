export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface WebAppInitData {
  user?: TelegramUser;
  start_param?: string;
}