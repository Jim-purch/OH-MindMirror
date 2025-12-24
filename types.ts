export interface OhCardImage {
  id: string;
  url: string;
  index: number; // 图像卡索引 (0-88)
}

export interface OhCardWord {
  id: string;
  text: string;
  url: string; // 文字卡图片路径
  index: number; // 文字卡索引 (89-176)
}

export interface CardCombination {
  image: OhCardImage;
  word: OhCardWord;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}

export interface Session {
  id: string;
  createdAt: number;
  lastUpdated: number;
  cards: CardCombination;
  messages: Message[];
  title?: string;
}

export type ViewState = 'welcome' | 'draw' | 'chat';

// API 配置设置
export interface ApiSettings {
  provider: 'google' | 'openai' | 'custom';
  apiKey: string;
  apiEndpoint: string;
  modelName: string;
}

// 默认 API 设置
export const DEFAULT_API_SETTINGS: ApiSettings = {
  provider: 'google',
  apiKey: '',
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta',
  modelName: 'gemini-2.5-flash',
};