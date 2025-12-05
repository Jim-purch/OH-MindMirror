import { OhCardImage, OhCardWord } from './types';

// Simulated OH Card Image Library (using Picsum with semantic descriptions for AI context)
export const OH_IMAGES: OhCardImage[] = [
  { id: '1', url: 'https://picsum.photos/id/1015/300/400', description: '一条蜿蜒的河流穿过峡谷，给人一种旅程和未知的宁静感' },
  { id: '2', url: 'https://picsum.photos/id/1020/300/400', description: '一只熊走在森林中，象征着力量、野性或潜在的危险' },
  { id: '3', url: 'https://picsum.photos/id/1025/300/400', description: '一只裹着毯子的哈巴狗，显得脆弱、舒适或有些忧郁' },
  { id: '4', url: 'https://picsum.photos/id/103/300/400', description: '一双穿着旧运动鞋的脚在草地上，象征休息、接地气或疲惫' },
  { id: '5', url: 'https://picsum.photos/id/1043/300/400', description: '色彩斑斓的波形图，象征着混乱、创造力或情绪的波动' },
  { id: '6', url: 'https://picsum.photos/id/106/300/400', description: '只有一位花朵的特写，象征着孤独、美丽或绽放' },
  { id: '7', url: 'https://picsum.photos/id/119/300/400', description: '一台旧式打字机，象征着沟通、过去的回忆或未说完的话' },
  { id: '8', url: 'https://picsum.photos/id/124/300/400', description: '一艘小船在平静的湖面上，象征着孤独的旅程或内心的平静' },
  { id: '9', url: 'https://picsum.photos/id/16/300/400', description: '一个人站在海边望着地平线，象征着渴望、思考或广阔' },
  { id: '10', url: 'https://picsum.photos/id/164/300/400', description: '一座古老的桥，象征着连接、过渡或克服障碍' },
];

export const OH_WORDS: OhCardWord[] = [
  { id: 'w1', text: '阻碍' },
  { id: 'w2', text: '希望' },
  { id: 'w3', text: '童年' },
  { id: 'w4', text: '恐惧' },
  { id: 'w5', text: '释放' },
  { id: 'w6', text: '家庭' },
  { id: 'w7', text: '秘密' },
  { id: 'w8', text: '改变' },
  { id: 'w9', text: '原谅' },
  { id: 'w10', text: '爱' },
  { id: 'w11', text: '责任' },
  { id: 'w12', text: '孤独' },
];

export const SYSTEM_INSTRUCTION = `
你是一位专业的心理咨询师，专精于使用“OH卡”（潜意识图像卡）进行心理投射和自我探索。

你的任务是引导用户基于他们抽到的“图画卡”和“文字卡”进行深入的对话。

规则：
1. **温和与包容**：始终保持非评判、共情和支持的态度。
2. **引导而非通过**：不要直接告诉用户卡片意味着什么。OH卡的意义在于用户的解读。
3. **探索性提问**：
   - 询问用户在图片中看到了什么？
   - 图片中的元素与文字卡（例如“恐惧”、“希望”）有什么联系？
   - 这张组合卡片让用户想起了生活中的什么经历或情绪？
4. **简洁回应**：对话应当像朋友聊天一样自然，不要长篇大论。
5. **聚焦当下**：关注用户此时此刻的感受。

开始时，你会收到用户抽到的卡片描述。请邀请用户描述他们的第一直觉。
`;
