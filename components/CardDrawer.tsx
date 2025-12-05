import React, { useState, useEffect } from 'react';
import { CardCombination, OhCardImage, OhCardWord } from '../types';
import { OH_IMAGES, OH_WORDS } from '../constants';

interface CardDrawerProps {
  onCardsSelected: (combination: CardCombination) => void;
}

const CardDrawer: React.FC<CardDrawerProps> = ({ onCardsSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawnCards, setDrawnCards] = useState<CardCombination | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [imageError, setImageError] = useState(false);

  const drawCards = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setImageError(false);

    // Simulate shuffling effect
    setTimeout(() => {
        const randomImage = OH_IMAGES[Math.floor(Math.random() * OH_IMAGES.length)];
        const randomWord = OH_WORDS[Math.floor(Math.random() * OH_WORDS.length)];
        setDrawnCards({ image: randomImage, word: randomWord });
        setIsShuffling(false);
        setIsFlipped(true);
    }, 600);
  };

  const handleConfirm = () => {
    if (drawnCards) {
        onCardsSelected(drawnCards);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">抽取你的心灵卡片</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md h-6 transition-all duration-300">
        {!isFlipped 
            ? "深呼吸，专注于你当下的困惑或感受，然后点击卡背。" 
            : "看着这张图片和文字，保持开放的心态。"}
      </p>

      {/* Card Container */}
      <div 
        className={`relative w-64 h-80 cursor-pointer group card-flip mb-8 ${isFlipped ? 'card-flipped' : ''}`}
        onClick={!isFlipped ? drawCards : undefined}
      >
        <div className="card-inner duration-700">
          
          {/* Card Back (Deck) */}
          <div className="card-front bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center border-4 border-white">
            <div className="text-white text-opacity-80 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <span className="font-serif italic text-lg">{isShuffling ? '洗牌中...' : '点击抽取'}</span>
            </div>
          </div>

          {/* Card Front (Result) */}
          <div className="card-back bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
            {drawnCards && (
              <>
                {/* Image Part */}
                <div className="flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={imageError ? 'https://placehold.co/300x400?text=OH+Image' : drawnCards.image.url} 
                    alt="OH Card" 
                    className="w-full h-full object-cover transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                </div>
                {/* Word Part */}
                <div className="h-16 flex items-center justify-center bg-white border-t-2 border-dashed border-gray-300">
                  <span className="text-2xl font-bold text-gray-800 tracking-widest">
                    {drawnCards.word.text}
                  </span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-4 animate-slide-up">
           <button 
            onClick={() => {
              setIsFlipped(false);
              setTimeout(() => setDrawnCards(null), 300);
            }}
            className="px-6 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
          >
            重抽一张
          </button>
          <button 
            onClick={handleConfirm}
            className="px-8 py-2 bg-primary text-white rounded-full shadow-lg hover:bg-indigo-600 transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>开始探索</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDrawer;