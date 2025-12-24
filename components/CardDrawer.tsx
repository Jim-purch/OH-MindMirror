import React, { useState } from 'react';
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
  const [wordImageError, setWordImageError] = useState(false);

  const drawCards = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setImageError(false);
    setWordImageError(false);

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
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">抽取你的心灵卡片</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md h-6 transition-all duration-300">
        {!isFlipped
          ? "深呼吸，专注于你当下的困惑或感受，然后点击卡背。"
          : "看着这张图片和文字，保持开放的心态。"}
      </p>

      {/* Cards Container - 两张卡片并排显示 */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">

        {/* 图像卡 */}
        <div
          className={`relative w-56 h-72 cursor-pointer group card-flip ${isFlipped ? 'card-flipped' : ''}`}
          onClick={!isFlipped ? drawCards : undefined}
        >
          <div className="card-inner duration-700">

            {/* Card Back (Deck) - 图像卡背面 */}
            <div className="card-front bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center border-4 border-white">
              <div className="text-white text-opacity-80 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="font-serif italic text-sm">图像卡</span>
                <span className="text-xs mt-1 opacity-70">{isShuffling ? '洗牌中...' : '点击抽取'}</span>
              </div>
            </div>

            {/* Card Front (Result) - 图像卡正面 */}
            <div className="card-back bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
              {drawnCards && (
                <div className="flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={imageError ? '/cards/image-card/0.jpg' : drawnCards.image.url}
                    alt="OH Card"
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 文字卡 */}
        <div
          className={`relative w-56 h-72 cursor-pointer group card-flip ${isFlipped ? 'card-flipped' : ''}`}
          onClick={!isFlipped ? drawCards : undefined}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="card-inner duration-700" style={{ transitionDelay: isFlipped ? '0.1s' : '0s' }}>

            {/* Card Back (Deck) - 文字卡背面 */}
            <div className="card-front bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-xl flex items-center justify-center border-4 border-white">
              <div className="text-white text-opacity-80 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span className="font-serif italic text-sm">文字卡</span>
                <span className="text-xs mt-1 opacity-70">{isShuffling ? '洗牌中...' : '点击抽取'}</span>
              </div>
            </div>

            {/* Card Front (Result) - 文字卡正面 */}
            <div className="card-back bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
              {drawnCards && (
                <div className="flex-1 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                  {!wordImageError ? (
                    <img
                      src={drawnCards.word.url}
                      alt={drawnCards.word.text}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      onError={() => setWordImageError(true)}
                    />
                  ) : (
                    // Fallback: 显示文字
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
                      <span className="text-4xl font-bold text-gray-800 tracking-widest">
                        {drawnCards.word.text}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* 当前抽到的词语提示 */}
      {isFlipped && drawnCards && (
        <p className="text-center text-gray-600 mb-4 animate-fade-in">
          图像卡 #{drawnCards.image.index + 1} + 文字卡【<span className="font-bold text-indigo-600">{drawnCards.word.text}</span>】
        </p>
      )}

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