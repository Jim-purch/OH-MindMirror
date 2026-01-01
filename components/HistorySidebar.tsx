import React from 'react';
import { Session } from '../types';

interface HistorySidebarProps {
  sessions: Session[];
  currentSessionId: string | null;
  onSelectSession: (session: Session) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static flex flex-col
      `}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-700">咨询记录</h2>
          <button onClick={onClose} className="md:hidden text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              onNewSession();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            回到首页
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-10">
              暂无历史记录
            </div>
          ) : (
            sessions.slice().reverse().map((session) => (
              <div
                key={session.id}
                onClick={() => {
                    onSelectSession(session);
                    if (window.innerWidth < 768) onClose();
                }}
                className={`
                  group relative p-3 rounded-lg cursor-pointer transition-colors border text-left pr-8
                  ${currentSessionId === session.id 
                    ? 'bg-secondary/20 border-primary/30' 
                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'}
                `}
              >
                <div className="font-medium text-gray-800 text-sm truncate flex items-center gap-1">
                  {session.type === 'sandplay' ? (
                      <span className="text-emerald-600" title="沙盘">🏝️</span>
                  ) : (
                      <span className="text-primary" title="OH卡">🎴</span>
                  )}
                  {session.title || '未命名对话'}
                </div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                   <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                   {session.cards && <span>{session.cards.word.text}</span>}
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('确定删除这段对话吗？')) {
                             onDeleteSession(session.id);
                        }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10"
                    title="删除"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
           MindMirror v1.0
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;
