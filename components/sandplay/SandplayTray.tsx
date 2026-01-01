import React from 'react';
import { PlacedToy } from '../../types';
import { TOY_DATA } from './toyData';
import ToyIcon from './ToyIcon';
import { SCENES } from './sceneData';

interface SandplayTrayProps {
  sceneId: string;
  placedToys: PlacedToy[];
  onDrop: (toyId: string, name: string, x: number, y: number) => void;
  onMoveToy: (id: string, x: number, y: number) => void;
  onSelectToy: (id: string | null) => void;
  selectedToyId: string | null;
}

const SandplayTray: React.FC<SandplayTrayProps> = ({
  sceneId,
  placedToys,
  onDrop,
  onMoveToy,
  onSelectToy,
  selectedToyId
}) => {
  const scene = SCENES.find(s => s.id === sceneId) || SCENES[0];
  const trayRef = React.useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!trayRef.current) return;

    const rect = trayRef.current.getBoundingClientRect();
    // Calculate percentage position relative to the tray
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const toyJson = e.dataTransfer.getData('toy');
    const existingToyId = e.dataTransfer.getData('placedToyId');

    if (toyJson) {
      // New toy dropped
      const toyDef = JSON.parse(toyJson);
      onDrop(toyDef.id, toyDef.name, x, y);
    } else if (existingToyId) {
      // Existing toy moved
      onMoveToy(existingToyId, x, y);
    }
  };

  const handleTrayClick = (e: React.MouseEvent) => {
     // Deselect if clicking on empty space (not on a toy)
     if (e.target === e.currentTarget) {
         onSelectToy(null);
     }
  };

  return (
    <div
      ref={trayRef}
      className="relative w-full aspect-video rounded-lg shadow-inner border-8 border-amber-900 overflow-hidden transition-all duration-500"
      style={scene.backgroundStyle}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleTrayClick}
    >
      {placedToys.map((toy) => {
        const toyDef = TOY_DATA.find(t => t.id === toy.toyId);
        if (!toyDef) return null;

        const isSelected = toy.id === selectedToyId;

        return (
          <div
            key={toy.id}
            className={`
                absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none
                transition-transform duration-200
                ${isSelected ? 'z-50 drop-shadow-2xl scale-110' : 'hover:scale-105'}
            `}
            style={{
                left: `${toy.x}%`,
                top: `${toy.y}%`,
                transform: `translate(-50%, -50%) rotate(${toy.rotation || 0}deg) scale(${toy.scale || 1})`,
                zIndex: isSelected ? 100 : Math.floor(toy.y) // Simple depth sorting based on Y
            }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('placedToyId', toy.id);
              e.stopPropagation();
              onSelectToy(toy.id);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectToy(toy.id);
            }}
          >
            <div className={`
                relative p-1
                ${isSelected ? 'ring-2 ring-primary ring-offset-2 rounded-full' : ''}
            `}>
                <ToyIcon toy={toyDef} size={48} className="drop-shadow-md" />

                {/* Selection Indicator Animation */}
                {isSelected && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
                )}
            </div>
          </div>
        );
      })}

      {/* Interaction Hint */}
      <div className="absolute bottom-2 right-2 text-xs text-white/70 pointer-events-none bg-black/20 px-2 py-1 rounded">
        拖拽摆放 • 点击选中调整
      </div>
    </div>
  );
};

export default SandplayTray;
