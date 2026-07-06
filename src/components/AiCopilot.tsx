import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getAiResponse } from '../services/mockData';
import type { ChatMessage } from '../types';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AiCopilot: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your CropOrbit AI Copilot. I analyze remote sensing parameters (NDVI, NDWI, Soil Moisture, LST) to assist you. Ask me anything about ${selectedFarm.name}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions
  const suggestions = [
    `How is the NDVI health score?`,
    `Does this farm need watering?`,
    `What is the expected yield?`,
    `Are there any active alerts?`
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Update initial message when farm changes
  useEffect(() => {
    setMessages(prev => {
      // Keep only initial message and update it
      const copy = [...prev];
      if (copy.length > 0 && copy[0].id === 'init-1') {
        copy[0].text = `Hello! I am your CropOrbit AI Copilot. I analyze remote sensing parameters (NDVI, NDWI, Soil Moisture, LST) to assist you. Ask me anything about ${selectedFarm.name}.`;
      }
      return copy;
    });
  }, [selectedFarm]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getAiResponse(text, selectedFarm);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-neon-cyan hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group border border-cyan-400/30"
      >
        <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-sm tracking-wide">
          ASK COPILOT
        </span>
      </button>

      {/* Sidebar Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />

            {/* Chat drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-slate-950/95 border-l border-slate-800 z-50 flex flex-col shadow-2xl backdrop-blur-md"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-850 flex justify-between items-center bg-slate-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    <Sparkles size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white tracking-wide text-sm sm:text-base flex items-center gap-1">
                      CropOrbit AI Copilot
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Active Live Analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                        <Bot size={16} />
                      </div>
                    )}
                    <div>
                      <div
                        className={`p-3.5 rounded-2xl text-sm ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 text-cyan-100 border border-cyan-500/20 rounded-tr-none'
                            : 'bg-slate-900/70 border border-slate-800/80 text-slate-300 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[10px] text-slate-500 mt-1 block ${msg.sender === 'user' ? 'text-right' : ''}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="bg-slate-900/70 border border-slate-800/80 text-slate-400 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="px-5 py-3 border-t border-slate-900/60">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Suggested queries</p>
                  <div className="flex flex-col gap-1.5">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="text-left text-xs p-2 rounded-lg bg-slate-900/40 border border-slate-850 hover:bg-slate-900/80 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all duration-200"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <div className="p-4 border-t border-slate-900/80 bg-slate-900/20 backdrop-blur-md">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('copilotPlaceholder')}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="p-3.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white hover:shadow-neon-cyan active:scale-95 transition-all"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiCopilot;
