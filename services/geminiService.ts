import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, MessageRole, CardCombination } from "../types";

// Helper to create the initial prompt context
export const createInitialContext = (cards: CardCombination): string => {
  return `
  [系统事件] 用户抽到了两张卡片：
  1. 图画卡描述：${cards.image.description}
  2. 文字卡内容：${cards.word.text}
  
  请基于这个组合，开始引导用户进行联想。请先询问用户看到这个组合的第一感觉是什么。
  `;
};

export const getGeminiChat = (history: Message[]): Chat => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert app history to Gemini history format
    const geminiHistory = history.map(msg => ({
      role: msg.role === MessageRole.USER ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: geminiHistory
    });

    return chat;
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({
      message: message,
    });
    return response.text || "抱歉，我现在无法回应，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接断开，请检查网络设置或稍后再试。";
  }
};