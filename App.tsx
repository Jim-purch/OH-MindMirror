import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from "@google/genai";
import { Session, ViewState, CardCombination, Message, MessageRole, ApiSettings, DEFAULT_API_SETTINGS } from './types';
import HistorySidebar from './components/HistorySidebar';
import CardDrawer from './components/CardDrawer';
import ChatArea from './components/ChatArea';
import SettingsModal from './components/SettingsModal';
import { getGeminiChat, sendMessage, createInitialContext } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiSettings, setApiSettings] = useState<ApiSettings>(DEFAULT_API_SETTINGS);

  // Refs
  const chatInstanceRef = useRef<Chat | null>(null);

  // --- Persistence (Load) ---
  useEffect(() => {
    // Load sessions
    const savedSessions = localStorage.getItem('oh_card_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse sessions", e);
      }
    }

    // Load API settings
    const savedSettings = localStorage.getItem('oh_card_api_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setApiSettings({ ...DEFAULT_API_SETTINGS, ...parsed });
      } catch (e) {
        console.error("Failed to parse API settings", e);
      }
    }
  }, []);

  // --- Persistence (Save) ---
  useEffect(() => {
    localStorage.setItem('oh_card_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('oh_card_api_settings', JSON.stringify(apiSettings));
  }, [apiSettings]);

  // --- Computed ---
  const currentSession = sessions.find(s => s.id === currentSessionId);

  // --- Actions ---

  const handleNewSession = () => {
    setViewState('draw');
    setCurrentSessionId(null);
    chatInstanceRef.current = null;
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setViewState('welcome');
      chatInstanceRef.current = null;
    }
  };

  const handleCardSelection = async (combination: CardCombination) => {
    const newSessionId = uuidv4();
    const initialMessage: Message = {
      id: uuidv4(),
      role: MessageRole.MODEL,
      text: `你好，欢迎来到这个安全的探索空间。🌿

请深呼吸，放松下来，看着你抽到的这两张卡片——一张图像卡和一张写着「${combination.word.text}」的文字卡。

不需要分析，也不需要寻找"正确答案"。就让自己自然地看着它们...

当你准备好时，可以告诉我：**你第一眼看到这个组合时，脑海中浮现了什么？** 可以是一个画面、一种感觉、一段记忆，或者任何联想。`,
      timestamp: Date.now()
    };

    const newSession: Session = {
      id: newSessionId,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      cards: combination,
      messages: [initialMessage],
      title: `${combination.word.text} - ${new Date().toLocaleTimeString().slice(0, 5)}`
    };

    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    setViewState('chat');

    // Initialize AI for Google provider
    if (apiSettings.provider === 'google') {
      chatInstanceRef.current = getGeminiChat([], apiSettings);

      // Send hidden context to AI to Prime it (not shown in UI)
      const hiddenContext = createInitialContext(combination);
      try {
        await chatInstanceRef.current.sendMessage({ message: hiddenContext });
      } catch (e) {
        console.error("Failed to prime AI", e);
      }
    }
  };

  const handleSelectSession = (session: Session) => {
    setCurrentSessionId(session.id);
    setViewState('chat');

    // Reinitialize chat for Google provider
    if (apiSettings.provider === 'google') {
      chatInstanceRef.current = getGeminiChat(session.messages, apiSettings);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!currentSessionId) return;

    const session = sessions.find(s => s.id === currentSessionId);
    if (!session) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: uuidv4(),
      role: MessageRole.USER,
      text,
      timestamp: Date.now()
    };

    const updatedMessages = [...session.messages, userMsg];

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: updatedMessages, lastUpdated: Date.now() };
      }
      return s;
    }));

    setIsLoading(true);

    // 2. Get AI Response using the unified sendMessage function
    const responseText = await sendMessage(
      chatInstanceRef.current,
      text,
      updatedMessages,
      apiSettings
    );

    // 3. Add Model Message
    const modelMsg: Message = {
      id: uuidv4(),
      role: MessageRole.MODEL,
      text: responseText,
      timestamp: Date.now()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, modelMsg], lastUpdated: Date.now() };
      }
      return s;
    }));

    setIsLoading(false);
  };

  const handleSaveSettings = (newSettings: ApiSettings) => {
    setApiSettings(newSettings);
    // Reset chat instance when settings change
    chatInstanceRef.current = null;
  };

  // --- Render ---

  return (
    <div className="flex h-screen w-full bg-background font-sans">

      {/* Sidebar (Responsive) */}
      <HistorySidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full relative">

        {/* Mobile Header Toggle */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="ml-4 font-bold text-gray-700">MindMirror</span>
        </div>

        {/* View Switcher */}
        <main className="flex-1 overflow-hidden relative">

          {viewState === 'welcome' && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">MindMirror</h1>
              <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                通过OH卡与潜意识对话。这不是占卜，这是一面映照内心的镜子。
                在这里，你可以安全地探索情绪、解开困惑。
              </p>
              <button
                onClick={handleNewSession}
                className="bg-primary hover:bg-indigo-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                开始探索
              </button>
            </div>
          )}

          {viewState === 'draw' && (
            <CardDrawer onCardsSelected={handleCardSelection} />
          )}

          {viewState === 'chat' && currentSession && (
            <ChatArea
              messages={currentSession.messages}
              cards={currentSession.cards}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          )}

        </main>

        {/* Settings Button - Fixed Bottom Left */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className={`
            fixed bottom-6 left-6 z-40
            w-12 h-12 rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-300 hover:scale-110 active:scale-95
            ${apiSettings.apiKey
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
              : 'bg-amber-500 text-white animate-pulse'}
          `}
          title={apiSettings.apiKey ? 'API 设置' : '点击配置 API Key'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* API Status Indicator */}
        {!apiSettings.apiKey && viewState !== 'welcome' && (
          <div className="fixed bottom-6 left-20 z-40 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-full text-sm shadow-lg animate-fade-in">
            ⚠️ 请先配置 API Key
          </div>
        )}

      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={apiSettings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default App;