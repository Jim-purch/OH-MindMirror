import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from "@google/genai";
import { Session, ViewState, CardCombination, Message, MessageRole } from './types';
import HistorySidebar from './components/HistorySidebar';
import CardDrawer from './components/CardDrawer';
import ChatArea from './components/ChatArea';
import { getGeminiChat, sendMessageToGemini, createInitialContext } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const chatInstanceRef = useRef<Chat | null>(null);

  // --- Persistence (Load) ---
  useEffect(() => {
    const savedSessions = localStorage.getItem('oh_card_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse sessions", e);
      }
    }
  }, []);

  // --- Persistence (Save) ---
  useEffect(() => {
    localStorage.setItem('oh_card_sessions', JSON.stringify(sessions));
  }, [sessions]);

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
      text: "你好。请深呼吸，看着这张卡片。当你准备好时，告诉我，你第一眼看到这张图和这个词时，想到了什么？",
      timestamp: Date.now()
    };

    const newSession: Session = {
      id: newSessionId,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      cards: combination,
      messages: [initialMessage],
      title: `${combination.word.text} - ${new Date().toLocaleTimeString().slice(0,5)}`
    };

    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    setViewState('chat');
    
    // Initialize AI
    chatInstanceRef.current = getGeminiChat([]);
    
    // Send hidden context to AI to Prime it (not shown in UI)
    const hiddenContext = createInitialContext(combination);
    try {
        await chatInstanceRef.current.sendMessage({ message: hiddenContext });
    } catch(e) {
        console.error("Failed to prime AI", e);
    }
  };

  const handleSelectSession = (session: Session) => {
    setCurrentSessionId(session.id);
    setViewState('chat');
    // Restore chat instance logic would go here. 
    // Since Gemini API is stateless REST under the hood for history unless we send it back,
    // we re-initialize. Ideally, we send history back to context.
    // For this demo, we re-init a fresh chatter but the UI shows history.
    // The next message will carry context if we were using `history` param in `chats.create`.
    // We will do a simple re-init for now.
    chatInstanceRef.current = getGeminiChat(session.messages); 
    // Note: A robust implementation would replay history to the model or use the history prop.
  };

  const handleSendMessage = async (text: string) => {
    if (!currentSessionId || !chatInstanceRef.current) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: uuidv4(),
      role: MessageRole.USER,
      text,
      timestamp: Date.now()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, userMsg], lastUpdated: Date.now() };
      }
      return s;
    }));

    setIsLoading(true);

    // 2. Get AI Response
    const responseText = await sendMessageToGemini(chatInstanceRef.current, text);

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
      </div>
    </div>
  );
};

export default App;