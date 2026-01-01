import React from 'react';
import { PlacedToy } from '../../types';

interface SandplayTrayProps {
  placedToys: PlacedToy[];
  onDrop: (toyId: string, emoji: string, name: string, x: number, y: number) => void;
  onMoveToy: (id: string, x: number, y: number) => void;
  onRemoveToy: (id: string) => void;
}

const SandplayTray: React.FC<SandplayTrayProps> = ({ placedToys, onDrop, onMoveToy, onRemoveToy }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const toyData = e.dataTransfer.getData('toy');
    if (toyData) {
      // New toy
      const { id, emoji, name } = JSON.parse(toyData);
      onDrop(id, emoji, name, x, y);
    } else {
      // Moving existing toy
      const existingToyId = e.dataTransfer.getData('placedToyId');
      if (existingToyId) {
        onMoveToy(existingToyId, x, y);
      }
    }
  };

  return (
    <div
      className="relative w-full aspect-video bg-[#e6cfa1] rounded-lg shadow-inner border-8 border-wood-800 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #f3e5be 10%, transparent 10%), radial-gradient(circle, #f3e5be 10%, transparent 10%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        backgroundColor: '#e6cfa1' // Sand color
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {placedToys.map((toy) => (
        <div
          key={toy.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move select-none text-4xl hover:scale-110 transition-transform"
          style={{ left: `${toy.x}%`, top: `${toy.y}%` }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('placedToyId', toy.id);
            e.stopPropagation();
          }}
          onClick={(e) => {
            if (e.shiftKey) {
                onRemoveToy(toy.id);
            }
          }}
          title={toy.name + " (Shift+Click 删除)"}
        >
          {toy.emoji}
        </div>
      ))}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 opacity-50 pointer-events-none">
        沙盘区域 (按住Shift点击玩具可移除)
      </div>
    </div>
  );
};

export default SandplayTray;
