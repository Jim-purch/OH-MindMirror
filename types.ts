export interface OhCardImage {
  id: string;
  url: string;
  description: string; // Semantic description for the AI
}

export interface OhCardWord {
  id: string;
  text: string;
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