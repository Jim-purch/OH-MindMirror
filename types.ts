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

export interface ToyDefinition {
  id: string;
  name: string;
  category: string;
  svg: string; // SVG path content or full SVG string
  defaultColor?: string;
}

export interface PlacedToy {
  id: string; // Unique ID for this placed instance
  toyId: string; // ID of the toy type
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  rotation: number; // Degrees 0-360
  scale: number; // Scale factor, default 1
  emoji?: string; // Kept for backward compatibility or as fallback
}

export interface SandplayScene {
  id: string;
  name: string;
  backgroundStyle: React.CSSProperties;
  description: string;
}

export interface SandplayData {
  sceneId?: string;
  placedToys: PlacedToy[];
  description?: string;
}

export type SessionType = 'oh-card' | 'sandplay';

export interface Session {
  id: string;
  type?: SessionType; // Optional for backward compatibility, defaults to 'oh-card'
  createdAt: number;
  lastUpdated: number;
  cards?: CardCombination; // Optional, present if type is 'oh-card'
  sandplayData?: SandplayData; // Optional, present if type is 'sandplay'
  messages: Message[];
  title?: string;
}

export type ViewState = 'welcome' | 'draw' | 'chat' | 'sandplay';

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
