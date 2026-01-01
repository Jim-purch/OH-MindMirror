import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SandplayTray from './SandplayTray';
import ToySelector from './ToySelector';
import { PlacedToy } from '../../types';

interface SandplayViewProps {
  onFinish: (placedToys: PlacedToy[], description: string) => void;
  onCancel: () => void;
}

const SandplayView: React.FC<SandplayViewProps> = ({ onFinish, onCancel }) => {
  const [placedToys, setPlacedToys] = useState<PlacedToy[]>([]);
  const [description, setDescription] = useState('');

  const handleDropToy = (toyId: string, emoji: string, name: string, x: number, y: number) => {
    const newToy: PlacedToy = {
      id: uuidv4(),
      toyId,
      emoji,
      name,
      x,
      y
    };
    setPlacedToys(prev => [...prev, newToy]);
  };

  const handleMoveToy = (id: string, x: number, y: number) => {
    setPlacedToys(prev => prev.map(t => t.id === id ? { ...t, x, y } : t));
  };

  const handleRemoveToy = (id: string) => {
    setPlacedToys(prev => prev.filter(t => t.id !== id));
  };

  const handleFinish = () => {
    if (placedToys.length === 0) {
      alert("请先放置一些玩具。");
      return;
    }
    onFinish(placedToys, description);
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">沙盘模拟</h2>
        <div className="space-x-2">
            <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                返回
            </button>
            <button
                onClick={handleFinish}
                className="px-6 py-2 bg-primary hover:bg-indigo-600 text-white rounded-full shadow transition-all hover:scale-105"
            >
                完成并开始对话
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 overflow-hidden">
        {/* Left/Top: Tray */}
        <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex-1 min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg p-2 md:p-4 shadow-sm border border-gray-100">
                 <SandplayTray
                    placedToys={placedToys}
                    onDrop={handleDropToy}
                    onMoveToy={handleMoveToy}
                    onRemoveToy={handleRemoveToy}
                />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    这一刻，你想给这个沙盘起个什么名字？或者有什么想说的？
                </label>
                <textarea
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary resize-none"
                    rows={2}
                    placeholder="例如：我的内心花园..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>

        {/* Right/Bottom: Selector */}
        <div className="md:col-span-1 h-full overflow-hidden">
          <ToySelector onDragStart={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default SandplayView;
