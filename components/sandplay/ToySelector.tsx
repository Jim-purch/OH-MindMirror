import React from 'react';

export interface ToyCategory {
  name: string;
  toys: { id: string; emoji: string; name: string }[];
}

const TOY_CATEGORIES: ToyCategory[] = [
  {
    name: '自然',
    toys: [
      { id: 'tree', emoji: '🌲', name: '树' },
      { id: 'flower', emoji: '🌻', name: '花' },
      { id: 'mountain', emoji: '⛰️', name: '山' },
      { id: 'rock', emoji: '🪨', name: '石头' },
      { id: 'water', emoji: '💧', name: '水' },
      { id: 'sun', emoji: '☀️', name: '太阳' },
      { id: 'moon', emoji: '🌙', name: '月亮' },
      { id: 'star', emoji: '⭐', name: '星星' },
    ]
  },
  {
    name: '人物',
    toys: [
      { id: 'person', emoji: '👤', name: '人' },
      { id: 'baby', emoji: '👶', name: '婴儿' },
      { id: 'man', emoji: '👨', name: '男人' },
      { id: 'woman', emoji: '👩', name: '女人' },
      { id: 'old_man', emoji: '👴', name: '老人' },
      { id: 'old_woman', emoji: '👵', name: '老妇' },
      { id: 'police', emoji: '👮', name: '警察' },
      { id: 'doctor', emoji: '🧑‍⚕️', name: '医生' },
    ]
  },
  {
    name: '动物',
    toys: [
      { id: 'dog', emoji: '🐶', name: '狗' },
      { id: 'cat', emoji: '🐱', name: '猫' },
      { id: 'lion', emoji: '🦁', name: '狮子' },
      { id: 'tiger', emoji: '🐯', name: '老虎' },
      { id: 'bear', emoji: '🐻', name: '熊' },
      { id: 'rabbit', emoji: '🐰', name: '兔子' },
      { id: 'snake', emoji: '🐍', name: '蛇' },
      { id: 'bird', emoji: '🐦', name: '鸟' },
      { id: 'fish', emoji: '🐟', name: '鱼' },
      { id: 'butterfly', emoji: '🦋', name: '蝴蝶' },
    ]
  },
  {
    name: '建筑/物品',
    toys: [
      { id: 'house', emoji: '🏠', name: '房子' },
      { id: 'castle', emoji: '🏰', name: '城堡' },
      { id: 'tent', emoji: '⛺', name: '帐篷' },
      { id: 'bridge', emoji: '🌉', name: '桥' },
      { id: 'car', emoji: '🚗', name: '车' },
      { id: 'boat', emoji: '⛵', name: '船' },
      { id: 'plane', emoji: '✈️', name: '飞机' },
      { id: 'book', emoji: '📖', name: '书' },
      { id: 'sword', emoji: '🗡️', name: '剑' },
      { id: 'shield', emoji: '🛡️', name: '盾' },
    ]
  }
];

interface ToySelectorProps {
  onDragStart: (toy: { id: string; emoji: string; name: string }) => void;
}

const ToySelector: React.FC<ToySelectorProps> = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {TOY_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.name}
            className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
              activeCategory === idx
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveCategory(idx)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Toys Grid */}
      <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto max-h-[200px] md:max-h-none">
        {TOY_CATEGORIES[activeCategory].toys.map((toy) => (
          <div
            key={toy.id}
            className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('toy', JSON.stringify(toy));
              onDragStart(toy);
            }}
            title={toy.name}
          >
            <span className="text-3xl mb-1">{toy.emoji}</span>
            <span className="text-xs text-gray-500">{toy.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToySelector;
