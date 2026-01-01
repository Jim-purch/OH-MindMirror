import React from 'react';
import { TOY_DATA } from './toyData';
import ToyIcon from './ToyIcon';
import { ToyDefinition } from '../../types';

interface ToySelectorProps {
  onDragStart: (toy: ToyDefinition) => void;
}

const ToySelector: React.FC<ToySelectorProps> = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = React.useState(TOY_DATA[0].category);
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = Array.from(new Set(TOY_DATA.map(t => t.category)));

  const filteredToys = TOY_DATA.filter(toy =>
    (toy.category === activeCategory || searchQuery) &&
    toy.name.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow border border-gray-200 overflow-hidden">

      {/* Search Bar */}
      <div className="p-2 border-b border-gray-100">
        <input
            type="text"
            placeholder="搜索玩具..."
            className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs (Hidden if searching) */}
      {!searchQuery && (
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 whitespace-nowrap text-sm font-medium flex-shrink-0 transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
      )}

      {/* Toys Grid */}
      <div className="p-4 grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-1 min-h-0 content-start">
        {filteredToys.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-4 text-sm">
                没有找到 "{searchQuery}"
            </div>
        ) : (
            filteredToys.map((toy) => (
            <div
                key={toy.id}
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors group aspect-square border border-transparent hover:border-gray-200"
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('toy', JSON.stringify(toy));
                    onDragStart(toy);
                }}
                title={toy.name}
            >
                <div className="transform group-hover:scale-110 transition-transform duration-200">
                    <ToyIcon toy={toy} size={32} />
                </div>
                <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">{toy.name}</span>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ToySelector;
