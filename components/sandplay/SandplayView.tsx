import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SandplayTray from './SandplayTray';
import ToySelector from './ToySelector';
import { PlacedToy, ToyDefinition } from '../../types';
import { SCENES } from './sceneData';

interface SandplayViewProps {
  onFinish: (placedToys: PlacedToy[], description: string, sceneId: string) => void;
  onCancel: () => void;
}

const SandplayView: React.FC<SandplayViewProps> = ({ onFinish, onCancel }) => {
  const [placedToys, setPlacedToys] = useState<PlacedToy[]>([]);
  const [description, setDescription] = useState('');
  const [sceneId, setSceneId] = useState(SCENES[0].id);
  const [selectedToyId, setSelectedToyId] = useState<string | null>(null);

  const handleDropToy = (toyId: string, name: string, x: number, y: number) => {
    const newToy: PlacedToy = {
      id: uuidv4(),
      toyId,
      name,
      x,
      y,
      rotation: 0,
      scale: 1
    };
    setPlacedToys(prev => [...prev, newToy]);
    setSelectedToyId(newToy.id); // Auto-select new toy
  };

  const handleMoveToy = (id: string, x: number, y: number) => {
    setPlacedToys(prev => prev.map(t => t.id === id ? { ...t, x, y } : t));
  };

  const handleRemoveToy = (id: string) => {
    setPlacedToys(prev => prev.filter(t => t.id !== id));
    if (selectedToyId === id) setSelectedToyId(null);
  };

  const handleFinish = () => {
    if (placedToys.length === 0) {
      alert("请先放置一些玩具。");
      return;
    }
    onFinish(placedToys, description, sceneId);
  };

  // Toy Transformation Handlers
  const updateSelectedToy = (updates: Partial<PlacedToy>) => {
      if (!selectedToyId) return;
      setPlacedToys(prev => prev.map(t => t.id === selectedToyId ? { ...t, ...updates } : t));
  };

  const selectedToy = placedToys.find(t => t.id === selectedToyId);

  return (
    <div className="flex flex-col h-full p-4 gap-4 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">沙盘模拟</h2>
            <p className="text-sm text-gray-500">选择一个场景，摆放你的心灵世界</p>
        </div>
        <div className="space-x-2 flex">
            <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                返回
            </button>
            <button
                onClick={handleFinish}
                className="px-6 py-2 bg-primary hover:bg-indigo-600 text-white rounded-full shadow transition-all hover:scale-105 flex-1 md:flex-none"
            >
                完成
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden min-h-0">

        {/* Left/Top: Tray & Controls */}
        <div className="lg:col-span-3 flex flex-col gap-4 min-h-0">
            {/* Scene Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {SCENES.map(scene => (
                    <button
                        key={scene.id}
                        onClick={() => setSceneId(scene.id)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border
                            ${sceneId === scene.id
                                ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                        `}
                        title={scene.description}
                    >
                        {scene.name}
                    </button>
                ))}
            </div>

            {/* Tray Area */}
            <div className="flex-1 relative bg-gray-50 rounded-lg shadow-sm border border-gray-100 flex flex-col min-h-[300px]">
                 <div className="flex-1 p-2 md:p-4 flex items-center justify-center overflow-hidden">
                    <SandplayTray
                        sceneId={sceneId}
                        placedToys={placedToys}
                        onDrop={handleDropToy}
                        onMoveToy={handleMoveToy}
                        onSelectToy={setSelectedToyId}
                        selectedToyId={selectedToyId}
                    />
                 </div>

                 {/* Transformation Toolbar (Floating or Fixed at bottom) */}
                 {selectedToy && (
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 p-2 rounded-full shadow-xl flex items-center gap-4 animate-fade-in z-50">
                        <span className="text-xs font-bold text-gray-500 pl-2">{selectedToy.name}</span>
                        <div className="h-4 w-px bg-gray-300"></div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">旋转</span>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={selectedToy.rotation || 0}
                                onChange={(e) => updateSelectedToy({ rotation: parseInt(e.target.value) })}
                                className="w-24 accent-primary"
                            />
                        </div>

                        <div className="h-4 w-px bg-gray-300"></div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">大小</span>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={selectedToy.scale || 1}
                                onChange={(e) => updateSelectedToy({ scale: parseFloat(e.target.value) })}
                                className="w-24 accent-primary"
                            />
                        </div>

                        <div className="h-4 w-px bg-gray-300"></div>

                        <button
                            onClick={() => handleRemoveToy(selectedToy.id)}
                            className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                            title="移除"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                     </div>
                 )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    此刻的感受与命名
                </label>
                <textarea
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary resize-none text-sm"
                    rows={2}
                    placeholder="给你的沙盘起个名字，或者写下你的感受..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>

        {/* Right/Bottom: Selector */}
        <div className="lg:col-span-1 h-full min-h-[300px] overflow-hidden">
          <ToySelector onDragStart={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default SandplayView;
