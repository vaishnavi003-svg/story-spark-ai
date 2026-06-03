import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X, Minus, Trash2, Bot, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  chatWithAI,
  chatWithAIFree,
  IChatMessage,
} from "../../services/ai.service";
import { getUserInfo } from "../../services/auth.service";
import toast from "react-hot-toast";

const ChatComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice interaction states
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const user = getUserInfo();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop listening automatically when speaker pauses
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast.error(`Speech error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle Text-to-Speech audio serialization
  const speakText = (text: string) => {
    if (!isSpeakingEnabled || !window.speechSynthesis) return;

    // Cancel any active speech queues
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Turn off speech playback instantly if user toggles it off manually
  useEffect(() => {
    if (!isSpeakingEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isSpeakingEnabled]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // If microphone is still recording when hitting send, stop it safely
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const currentMessageText = message;
    const userMessage: IChatMessage = { role: "user", parts: currentMessageText };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const chatFn = user ? chatWithAI : chatWithAIFree;
      const history = messages.slice(-10); 
      const response = await chatFn(currentMessageText, history);

      const botMessage: IChatMessage = { role: "model", parts: response };
      setMessages((prev) => [...prev, botMessage]);
      
      // Trigger vocal output playback
      speakText(response);
    } catch (error: unknown) {
      console.error("Chat error:", error);
      const message =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data &&
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : "Failed to get AI response";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setMessages([]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "64px" : "500px",
              width: "350px",
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">StorySpark AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-[10px] text-indigo-100">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Text-to-Speech Toggle Action Icon */}
                {!isMinimized && (
                  <button
                    onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
                    className={`p-1.5 rounded-lg transition-colors mr-1 ${
                      isSpeakingEnabled ? "bg-white/20 text-green-300" : "hover:bg-white/10 text-indigo-200"
                    }`}
                    title={isSpeakingEnabled ? "Mute Bot Responses" : "Enable Bot Voice Responses"}
                  >
                    {isSpeakingEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                )}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Minus size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 opacity-60">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-2">
                        <MessageSquare size={24} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-medium">
                        Hello! How can I help you today?
                      </p>
                      <p className="text-xs">
                        Ask me about story ideas, characters, or writing tips!
                      </p>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                            msg.role === "user"
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <User size={16} />
                          ) : (
                            <Bot size={16} />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-2xl text-sm ${
                            msg.role === "user"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none"
                          }`}
                        >
                          {msg.parts}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input with Integrated Voice Recognition Controls */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                  <form onSubmit={handleSend} className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={clearChat}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      title="Clear chat"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="relative flex-grow flex items-center">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={isListening ? "Listening closely..." : "Type your message..."}
                        className="w-full pr-10 p-2 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      {/* Speech-to-Text Recording Button */}
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`absolute right-2 p-1.5 rounded-lg transition-all ${
                          isListening
                            ? "text-red-500 animate-pulse bg-red-100 dark:bg-red-950/50"
                            : "text-slate-400 hover:text-indigo-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                        title={isListening ? "Stop listening" : "Start voice input"}
                      >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!message.trim() || isLoading}
                      className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shrink-0"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-slate-800 text-white rotate-90"
            : "bg-indigo-600 text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default ChatComponent;