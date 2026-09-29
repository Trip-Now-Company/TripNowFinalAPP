import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { sendAssistantMessage, AssistantMessage } from '../services/assistantService';

interface AIAssistantModalProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  lang, 
  onNavigate,
  isOpenExternal,
  onCloseExternal
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;
  
  const handleOpen = () => {
    setInternalIsOpen(true);
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'es' 
        ? '¡Hola! Soy tu asistente de **Trip Now El Salvador**.\n\nEstoy capacitado con estrictas limitaciones de privacidad para guiarte exclusivamente dentro de las funciones de la página (cómo reservar, catálogo de vehículos, sucursales y requisitos de renta).\n\n¿En qué proceso te puedo orientar hoy?'
        : 'Hello! I am your official **Trip Now El Salvador** assistant.\n\nI operate under strict privacy guardrails to guide you solely within our website features (how to book, fleet catalog, branch locations, and rental requirements).\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        tab: 'catalog',
        label: lang === 'es' ? 'Explorar Catálogo' : 'Explore Fleet',
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  // Suggested quick prompts
  const quickPrompts = lang === 'es' 
    ? [
        '¿Cómo rentar un auto?',
        '¿Qué funciones tiene la página?',
        '¿Cuáles son los requisitos?',
        'Sucursales y horarios',
        'Recomiéndame un auto',
        '¿Tienen kilometraje ilimitado?'
      ]
    : [
        'How to rent a car?',
        'What features does the page have?',
        'What are the requirements?',
        'Branches & 24/7 hours',
        'Recommend a car',
        'Is mileage unlimited?'
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMessage: AssistantMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendAssistantMessage(promptText, messages, lang);

      const assistantReply: AssistantMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: response.action,
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (_err) {
      const fallbackReply: AssistantMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: lang === 'es'
          ? 'Disculpa, no pude procesar tu solicitud en este momento. Por favor revisa el catálogo o consulta directamente en nuestras sucursales.'
          : 'Sorry, I could not process your request right now. Please explore our fleet or visit any of our branches.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: lang === 'es'
          ? 'Conversación reiniciada. ¿En qué más puedo asistirte sobre tu renta de auto con Trip Now?'
          : 'Conversation cleared. How else can I assist you with your Trip Now car rental?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          tab: 'catalog',
          label: lang === 'es' ? 'Ver Catálogo' : 'View Fleet',
        },
      },
    ]);
  };

  const renderFormattedText = (rawText: string) => {
    // Process markdown bolding and bullet points cleanly
    return rawText.split('\n').map((line, idx) => {
      // Bold handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <p key={idx} className={line.trim() === '' ? 'h-2' : 'my-0.5 leading-relaxed'}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        {!isOpen && (
          <button
            onClick={handleOpen}
            className="group relative flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-stone-900/30 transition-all duration-300 border border-stone-700/60 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Abrir asistente de ayuda"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <span className="block text-xs font-semibold tracking-wide">
                {lang === 'es' ? 'Asistente IA' : 'Trip Assistant'}
              </span>
              <span className="block text-[10px] text-stone-400 -mt-0.5">
                {lang === 'es' ? 'Guía y preguntas' : 'Help & guidance'}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Assistant Modal / Drawer Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 flex items-end sm:items-auto justify-center sm:justify-end">
          {/* Backdrop on mobile */}
          <div 
            className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs sm:hidden"
            onClick={handleClose}
          />

          <div className="relative w-full sm:w-[410px] h-[85vh] sm:h-[580px] max-h-[640px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-6 duration-200">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm tracking-tight text-white">
                      Trip Now Concierge
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {lang === 'es' ? 'Asistente de renta en El Salvador' : 'Rental concierge in El Salvador'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title={lang === 'es' ? 'Reiniciar conversación' : 'Reset chat'}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  title={lang === 'es' ? 'Cerrar' : 'Close'}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Security Guardrail Notice Banner */}
            <div className="bg-amber-50/90 border-b border-amber-100 px-3 py-1.5 flex items-center gap-2 text-[11px] text-amber-900 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">
                {lang === 'es' 
                  ? 'Asistente oficial verificado. Datos privados protegidos.' 
                  : 'Official verified assistant. Privacy protected.'}
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-stone-900 text-white rounded-br-xs'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Action Button inside message if suggested */}
                    {msg.suggestedAction && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center">
                        <button
                          onClick={() => {
                            if (msg.suggestedAction) {
                              onNavigate(msg.suggestedAction.tab);
                              handleClose();
                            }
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-lg border border-amber-200 transition-colors cursor-pointer"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3 text-amber-700" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs shadow-xs text-stone-500 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></span>
                    </span>
                    <span className="text-[11px]">
                      {lang === 'es' ? 'Consultando guía...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2 bg-white border-t border-stone-100 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
              {quickPrompts.map((promptText, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(promptText)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-200 border border-stone-200 rounded-full transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Escribe tu pregunta o duda...'
                      : 'Ask a question or get help...'
                  }
                  className="w-full text-xs bg-stone-100/80 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white transition-all"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white disabled:opacity-40 disabled:hover:bg-stone-900 transition-colors cursor-pointer shrink-0"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
