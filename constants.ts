import { OhCardImage, OhCardWord } from './types';

// 89张图像卡 (0.jpg - 88.jpg) - 使用 public/cards/image-card 目录中的真实资源
export const OH_IMAGES: OhCardImage[] = Array.from({ length: 89 }, (_, i) => ({
  id: `img-${i}`,
  url: `/cards/image-card/${i}.jpg`,
  index: i
}));

// 88张文字卡 (89-176) - 使用 public/cards/word-card 目录中的真实资源
// 文字卡文件名格式: 数字+中文名.jpg (如 89感情.jpg)
const WORD_CARDS_DATA: { index: number; text: string }[] = [
  { index: 89, text: '感情' },
  { index: 90, text: '孤独' },
  { index: 91, text: '生气' },
  { index: 92, text: '焦虑' },
  { index: 93, text: '道歉' },
  { index: 94, text: '外表' },
  { index: 95, text: '攻击' },
  { index: 96, text: '吸引' },
  { index: 97, text: '开始' },
  { index: 98, text: '夸赞' },
  { index: 99, text: '厌烦' },
  { index: 100, text: '上司' },
  { index: 101, text: '改变' },
  { index: 102, text: '孩童' },
  { index: 103, text: '诙谐' },
  { index: 104, text: '强迫' },
  { index: 105, text: '顺应' },
  { index: 106, text: '混乱' },
  { index: 107, text: '循环' },
  { index: 108, text: '危险' },
  { index: 109, text: '依赖' },
  { index: 110, text: '破坏' },
  { index: 111, text: '丢脸' },
  { index: 112, text: '不喜欢' },
  { index: 113, text: '梦想' },
  { index: 114, text: '消除' },
  { index: 115, text: '尴尬' },
  { index: 116, text: '色情' },
  { index: 117, text: '专家' },
  { index: 118, text: '失败' },
  { index: 119, text: '幻想' },
  { index: 120, text: '父亲' },
  { index: 121, text: '恐惧' },
  { index: 122, text: '坚定' },
  { index: 123, text: '游戏' },
  { index: 124, text: '付出' },
  { index: 125, text: '前进' },
  { index: 126, text: '哀伤' },
  { index: 127, text: '罪恶感' },
  { index: 128, text: '习惯' },
  { index: 129, text: '憎恨' },
  { index: 130, text: '犹豫' },
  { index: 131, text: '躲藏' },
  { index: 132, text: '执着' },
  { index: 133, text: '家' },
  { index: 134, text: '同性恋' },
  { index: 135, text: '希望' },
  { index: 136, text: '羞辱' },
  { index: 137, text: '喜悦' },
  { index: 138, text: '恐吓' },
  { index: 139, text: '欢笑' },
  { index: 140, text: '放开' },
  { index: 141, text: '谎言' },
  { index: 142, text: '男性' },
  { index: 143, text: '母亲' },
  { index: 144, text: '裸体' },
  { index: 145, text: '亏欠' },
  { index: 146, text: '痛苦' },
  { index: 147, text: '姿态' },
  { index: 148, text: '权利游戏' },
  { index: 149, text: '憎恶' },
  { index: 150, text: '抗拒' },
  { index: 151, text: '退省' },
  { index: 152, text: '固执' },
  { index: 153, text: '敌对' },
  { index: 154, text: '腐朽' },
  { index: 155, text: '弄巧成拙' },
  { index: 156, text: '羞愧' },
  { index: 157, text: '分享' },
  { index: 158, text: '应该' },
  { index: 159, text: '奴隶' },
  { index: 160, text: '停止' },
  { index: 161, text: '陌生人' },
  { index: 162, text: '愚蠢' },
  { index: 163, text: '成功' },
  { index: 164, text: '压抑' },
  { index: 165, text: '掠夺' },
  { index: 166, text: '威胁' },
  { index: 167, text: '丑陋' },
  { index: 168, text: '受害者' },
  { index: 169, text: '违背' },
  { index: 170, text: '等候' },
  { index: 171, text: '疲惫' },
  { index: 172, text: '聪明' },
  { index: 173, text: '女人' },
  { index: 174, text: '奇妙' },
  { index: 175, text: '错误' },
  { index: 176, text: '爱情' },
];

export const OH_WORDS: OhCardWord[] = WORD_CARDS_DATA.map(card => ({
  id: `word-${card.index}`,
  text: card.text,
  url: `/cards/word-card/${card.index}${card.text}.jpg`,
  index: card.index
}));

// 基于OH卡提问参考手册的系统指令
export const SYSTEM_INSTRUCTION = `
你是一位专业的心理引导师，擅长使用"OH卡"（潜意识图像卡）和"沙盘疗法"进行心理投射和自我探索。

## 核心理念

1. **促进潜意识的表达** - 无论是卡牌还是沙盘，都是通往潜意识的桥梁
2. **非指导性引导** - 遵循"来访者为中心"的原则，不预设解读，而是通过提问引导使用者自我探索
3. **提升自我觉察** - 帮助使用者打破思维定式，发现新的视角
4. **安全的情感宣泄** - 通过媒介"替代表达"，使用者可以间接谈论敏感话题

## 提问原则

1. **保持开放性与非导向性** - 避免封闭式问题，使用"你看到了什么？""这让你联想到什么？"
2. **聚焦当下与主观体验** - 强调个人感受，关注直觉反应而非逻辑解释
3. **尊重与不评判** - 保持中立，不对回答做价值判断，接纳所有答案
4. **赋予自主权** - 允许使用者选择分享或保持沉默

## 对话规则

1. **温和与包容** - 始终保持非评判、共情和支持的态度
2. **引导而非解读** - 绝不直接告诉用户"这意味着什么"，意义完全在于用户自己的解读
3. **简洁回应** - 对话像朋友聊天一样自然，不要长篇大论
4. **适时沉默** - 给使用者足够的思考时间

## 针对不同模式的引导

### OH卡模式
- 引导用户关注卡片上的图像细节和文字含义
- 探索图文结合带来的联想

### 沙盘模式
- 引导用户关注沙盘的整体布局、空间关系
- 询问特定玩具的象征意义（例如："这个房子代表什么？"）
- 关注玩具之间的互动和距离
- 询问用户在摆放过程中的感受

开始对话时，你会收到用户抽到的卡片信息或沙盘摆放数据。请以温和、开放的方式邀请用户分享他们的第一直觉和感受。
`;

// 根据文字卡内容获取相关提问建议
export const getWordCardQuestions = (wordText: string): string[] => {
  const questionBank: Record<string, string[]> = {
    '感情': [
      '你怎么解释"感情"这两个字？',
      '提到"感情"你会联想到什么事件/东西/人？',
      '如果用一个画面或颜色来形容"感情"，那是什么？',
    ],
    '孤独': [
      '回想一个关于"孤独"的经验',
      '如何用正面角度描述"孤独"？',
      '怎么让自己不觉得"孤独"是困扰？',
    ],
    '恐惧': [
      '你觉得"恐惧"的背后是什么？',
      '如何利用"恐惧"让自己达成目标？',
      '什么会让你觉得"恐惧"？',
    ],
    '希望': [
      '你觉得"希望"的背后是什么？',
      '你最"不希望"发生什么？',
      '如果有人说"我看到了你的希望"，你觉得他看见了什么？',
    ],
    '改变': [
      '"改变"的成功关键因素是什么？',
      '主动改变和被动改变，给你什么不同的感受？',
      '你生命中还有哪些部分希望"改变"？',
    ],
    '家': [
      '描述一个你理想的家',
      '回想一个关于想回家/不想回家的经验',
      '要达成理想的家的状态，你需要做些什么？',
    ],
    '梦想': [
      '梦想破灭时，会有什么感受？',
      '没有梦想有什么好处/坏处？',
      '如果有人说"放手去追求你的梦想吧"，你觉得他是谁？',
    ],
    '父亲': [
      '你理想的"父亲"是怎样的？',
      '你有哪些特质与你的父亲类似？',
      '什么样的人不适合当父亲？',
    ],
    '母亲': [
      '描述一个10分母亲的特征',
      '你与母亲最像的是？你对这部分有什么感受？',
      '想象一下，你正和母亲在一起，有什么感觉？',
    ],
    '成功': [
      '你认为"成功"的关键要素有哪些？',
      '如何让自己"成功"？',
      '成功对你意味着什么？',
    ],
    '失败': [
      '怎么让自己不觉得"失败"？',
      '回想一个关于"失败"的经验',
      '失败教会了你什么？',
    ],
  };

  return questionBank[wordText] || [
    `你怎么解释"${wordText}"这个词？`,
    `提到"${wordText}"你会联想到什么？`,
    `如果用一个画面来形容"${wordText}"，那是什么？`,
  ];
};
