import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION, getWordCardQuestions } from "../constants";
import { Message, MessageRole, CardCombination, ApiSettings } from "../types";

// Helper to create the initial prompt context based on OH卡提问参考手册
export const createInitialContext = (cards: CardCombination): string => {
  const suggestedQuestions = getWordCardQuestions(cards.word.text);

  return `
[系统事件] 用户抽到了两张OH卡：

1. 图像卡：编号 #${cards.image.index + 1}
   - 这是一张实际的OH卡图像，用户可以看到具体画面内容
   
2. 文字卡：「${cards.word.text}」
   - 编号 #${cards.word.index}

## 引导建议

根据OH卡提问参考手册，针对文字卡「${cards.word.text}」，可以考虑以下提问方向：
${suggestedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

## 图像卡通用引导提问

- 这张图上画的是什么？哪些部分吸引了你的注意？
- 图上什么部分最吸引你的注意力？为什么？
- 如果你置身于这个场景，你会在哪里？你会看到什么？
- 这张图让你联想到哪些生命经验？

## 图文结合引导

- 这张图片和「${cards.word.text}」这个词之间，你看到什么联系？
- 如果这张图代表你目前的状态，「${cards.word.text}」是什么角色？

请以温和、开放、非评判的态度，邀请用户分享他们看到这个组合的第一直觉和感受。记住：
- 不要解读卡牌的意义，让用户自己发现
- 循序渐进，从表层感受开始
- 保持简洁自然的对话风格
  `;
};

// Google Gemini Chat 实例
export const getGeminiChat = (history: Message[], apiSettings?: ApiSettings): Chat => {
  const apiKey = apiSettings?.apiKey || process.env.API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  // Convert app history to Gemini history format
  const geminiHistory = history.map(msg => ({
    role: msg.role === MessageRole.USER ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const modelName = apiSettings?.modelName || 'gemini-2.5-flash';

  const chat = ai.chats.create({
    model: modelName,
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

// OpenAI 兼容 API 调用
export const sendMessageToOpenAI = async (
  messages: { role: string; content: string }[],
  apiSettings: ApiSettings
): Promise<string> => {
  try {
    const response = await fetch(`${apiSettings.apiEndpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiSettings.apiKey}`,
      },
      body: JSON.stringify({
        model: apiSettings.modelName,
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API Error:', error);
      return `API 请求失败: ${response.status}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "抱歉，我现在无法回应，请稍后再试。";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "连接断开，请检查网络设置或 API 配置。";
  }
};

// 通用消息发送函数，根据 provider 选择不同的 API
export const sendMessage = async (
  chatInstance: Chat | null,
  message: string,
  allMessages: Message[],
  apiSettings: ApiSettings
): Promise<string> => {
  // 如果没有 API Key，返回提示
  if (!apiSettings.apiKey) {
    return "请先在设置中配置 API Key，才能开始对话。点击左下角的设置按钮进行配置。";
  }

  if (apiSettings.provider === 'google' && chatInstance) {
    return sendMessageToGemini(chatInstance, message);
  } else if (apiSettings.provider === 'openai' || apiSettings.provider === 'custom') {
    // 转换消息格式为 OpenAI 格式
    const openaiMessages = allMessages.map(msg => ({
      role: msg.role === MessageRole.USER ? 'user' : 'assistant',
      content: msg.text
    }));
    openaiMessages.push({ role: 'user', content: message });

    return sendMessageToOpenAI(openaiMessages, apiSettings);
  }

  return "未知的 API 提供商配置";
};