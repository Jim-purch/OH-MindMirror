import React, { useState, useEffect } from 'react';
import { ApiSettings, DEFAULT_API_SETTINGS } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: ApiSettings;
    onSave: (settings: ApiSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState<ApiSettings>(settings);
    const [showApiKey, setShowApiKey] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings, isOpen]);

    const handleSave = () => {
        onSave(localSettings);
        onClose();
    };

    const handleProviderChange = (provider: ApiSettings['provider']) => {
        let newSettings = { ...localSettings, provider };

        // 设置默认端点
        switch (provider) {
            case 'google':
                newSettings.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta';
                newSettings.modelName = 'gemini-2.5-flash';
                break;
            case 'openai':
                newSettings.apiEndpoint = 'https://api.openai.com/v1';
                newSettings.modelName = 'gpt-4o-mini';
                break;
            case 'custom':
                // 保持当前值或清空
                break;
        }

        setLocalSettings(newSettings);
    };

    const testConnection = async () => {
        setTestStatus('testing');
        try {
            // 简单的连接测试
            const response = await fetch(localSettings.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localSettings.apiKey}`,
                },
            });
            // 即使返回错误状态，只要能连接就算成功
            setTestStatus('success');
            setTimeout(() => setTestStatus('idle'), 3000);
        } catch (error) {
            setTestStatus('error');
            setTimeout(() => setTestStatus('idle'), 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h2 className="text-xl font-bold">API 设置</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-white/80 text-sm mt-2">配置 AI 模型连接参数</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Provider Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">服务提供商</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'google', label: 'Google', icon: '🔷' },
                                { id: 'openai', label: 'OpenAI', icon: '🤖' },
                                { id: 'custom', label: '自定义', icon: '⚙️' },
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => handleProviderChange(p.id as ApiSettings['provider'])}
                                    className={`
                    p-3 rounded-xl border-2 transition-all text-sm font-medium
                    ${localSettings.provider === p.id
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                            : 'border-gray-200 hover:border-gray-300 text-gray-600'}
                  `}
                                >
                                    <span className="text-lg block mb-1">{p.icon}</span>
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* API Key */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                        <div className="relative">
                            <input
                                type={showApiKey ? 'text' : 'password'}
                                value={localSettings.apiKey}
                                onChange={(e) => setLocalSettings({ ...localSettings, apiKey: e.target.value })}
                                placeholder="输入你的 API Key..."
                                className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showApiKey ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* API Endpoint */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API 端点</label>
                        <input
                            type="text"
                            value={localSettings.apiEndpoint}
                            onChange={(e) => setLocalSettings({ ...localSettings, apiEndpoint: e.target.value })}
                            placeholder="https://api.example.com/v1"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    {/* Model Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">模型名称</label>
                        <input
                            type="text"
                            value={localSettings.modelName}
                            onChange={(e) => setLocalSettings({ ...localSettings, modelName: e.target.value })}
                            placeholder="gpt-4o-mini / gemini-2.5-flash"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            {localSettings.provider === 'google' && '推荐: gemini-2.5-flash, gemini-1.5-pro'}
                            {localSettings.provider === 'openai' && '推荐: gpt-4o-mini, gpt-4o, gpt-3.5-turbo'}
                            {localSettings.provider === 'custom' && '输入你的模型名称'}
                        </p>
                    </div>

                    {/* Status indicator */}
                    {!localSettings.apiKey && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <span className="text-sm text-amber-700">请输入 API Key 以启用 AI 对话功能</span>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors shadow-lg shadow-indigo-500/25"
                    >
                        保存设置
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
