import React, { useRef, useEffect, useState } from 'react';
import { Message, MessageRole, CardCombination, PlacedToy } from '../types';

interface ChatAreaProps {
  messages: Message[];
  cards?: CardCombination;
  sandplayData?: { placedToys: PlacedToy[] };
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, cards, sandplayData, onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [wordImageError, setWordImageError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const downloadChat = () => {
    const content = messages.map(m => `[${m.role === 'user' ? '我' : 'MindMirror'}]: ${m.text}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mind-mirror-session-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasCards = !!cards;
  const hasSandplay = !!sandplayData;

  return (
    <div className="flex flex-col h-full bg-background relative">

      {/* Sticky Header with Mini-view */}
      <div className="flex-none bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
          onClick={() => setShowPreview(!showPreview)}
        >
          {hasCards && cards && (
            <>
              {/* 图像卡缩略图 */}
              <div className="w-10 h-10 rounded overflow-hidden border border-gray-200 shadow-sm">
                <img src={cards.image.url} className="w-full h-full object-cover" alt="图像卡" />
              </div>
              {/* 文字卡缩略图 */}
              <div className="w-10 h-10 rounded overflow-hidden border border-amber-200 shadow-sm bg-amber-50 flex items-center justify-center">
                {!wordImageError ? (
                  <img
                    src={cards.word.url}
                    className="w-full h-full object-cover"
                    alt={cards.word.text}
                    onError={() => setWordImageError(true)}
                  />
                ) : (
                  <span className="text-xs font-bold text-amber-700">{cards.word.text}</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-700 text-sm">OH卡探索</h3>
                <p className="text-xs text-gray-500">#{cards.image.index + 1} + 「{cards.word.text}」</p>
              </div>
            </>
          )}

          {hasSandplay && (
            <>
              <div className="w-10 h-10 rounded bg-[#e6cfa1] flex items-center justify-center border border-wood-800 shadow-sm">
                 <span className="text-xl">🏝️</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 text-sm">沙盘探索</h3>
                <p className="text-xs text-gray-500">共 {sandplayData.placedToys.length} 个物件</p>
              </div>
            </>
          )}

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 text-gray-400 transition-transform ${showPreview ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <button
          onClick={downloadChat}
          className="text-gray-500 hover:text-primary transition-colors p-2"
          title="下载对话记录"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
      </div>

      {/* 预览面板 */}
      {showPreview && (
        <div className="flex-none bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 p-4 animate-fade-in">
          {hasCards && cards && (
            <div className="flex justify-center gap-6">
              {/* 图像卡 */}
              <div className="text-center">
                <div className="w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-lg">
                  <img src={cards.image.url} className="w-full h-full object-cover" alt="图像卡" />
                </div>
                <p className="text-xs text-gray-500 mt-2">图像卡 #{cards.image.index + 1}</p>
              </div>
              {/* 文字卡 */}
              <div className="text-center">
                <div className="w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden border-2 border-amber-200 shadow-lg bg-amber-50 flex items-center justify-center">
                  {!wordImageError ? (
                    <img
                      src={cards.word.url}
                      className="w-full h-full object-cover"
                      alt={cards.word.text}
                      onError={() => setWordImageError(true)}
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl font-bold text-amber-700">{cards.word.text}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">文字卡「{cards.word.text}」</p>
              </div>
            </div>
          )}

          {hasSandplay && sandplayData && (
             <div className="flex flex-col items-center">
                <div className="relative w-full max-w-lg aspect-video bg-[#e6cfa1] rounded-lg shadow-inner border-4 border-wood-800 overflow-hidden mb-2">
                    {/* Simplified read-only view of sandplay */}
                    {sandplayData.placedToys.map(toy => (
                         <div
                            key={toy.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl select-none"
                            style={{ left: `${toy.x}%`, top: `${toy.y}%` }}
                          >
                            {toy.emoji}
                          </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500">沙盘快照</p>
             </div>
          )}
          <p className="text-center text-xs text-gray-400 mt-3">点击上方标题栏可以收起预览</p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <div className="text-center py-4">
          <p className="text-xs text-gray-400 bg-gray-100 inline-block px-3 py-1 rounded-full">
            今天是 {new Date().toLocaleDateString()}
          </p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                ${msg.role === MessageRole.USER
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入你的想法..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-primary text-white rounded-full p-2.5 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
