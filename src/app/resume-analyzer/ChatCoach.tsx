"use client";

import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatCoachProps {
  analysisContext: string;
  freeMessages: number;
  usedMessages: number;
  onMessageUsed: () => void;
  hasUnlimitedChat: boolean;
  onUpgradeClick: () => void;
}

const STARTER_PROMPTS = [
  "How do I address the gaps you found?",
  "What should I change first?",
  "Help me rewrite my summary section",
  "How do I stand out for this role?",
];

export default function ChatCoach({
  analysisContext,
  freeMessages,
  usedMessages,
  onMessageUsed,
  hasUnlimitedChat,
  onUpgradeClick,
}: ChatCoachProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey! I just reviewed your resume. Ask me anything — how to fix the gaps, rewrite specific bullets, or position yourself better for this role. I'm here to help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = hasUnlimitedChat
    ? Infinity
    : freeMessages - usedMessages;
  const isLocked = remaining <= 0 && !hasUnlimitedChat;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading || isLocked) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    onMessageUsed();

    try {
      const res = await fetch("/api/chat-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          analysisContext,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setMessages([...newMessages, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, something went wrong. Try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Floating chat bubble when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-navy-800 hover:bg-navy-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-105 group"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {messages.length === 1 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral-500 rounded-full animate-pulse" />
          )}
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask me anything
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-cream-300 flex flex-col overflow-hidden"
      style={{ height: "min(520px, calc(100vh - 6rem))" }}
    >
      {/* Header */}
      <div className="bg-navy-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            H
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Harshal — Coach</p>
            <p className="text-cream-300 text-xs">
              {hasUnlimitedChat
                ? "Unlimited messages"
                : `${Math.max(0, remaining)} free message${remaining !== 1 ? "s" : ""} left`}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-cream-300 hover:text-white transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-coral-500 text-white rounded-br-md"
                  : "bg-cream-200 text-navy-700 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-cream-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-navy-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter prompts (only show initially) */}
      {messages.length <= 1 && !loading && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              className="text-xs bg-cream-100 hover:bg-cream-200 text-navy-600 px-3 py-1.5 rounded-full transition-colors border border-cream-300"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Locked state */}
      {isLocked && (
        <div className="px-4 pb-3 pt-1">
          <div className="bg-cream-100 rounded-xl p-3 text-center">
            <p className="text-navy-600 text-xs mb-2">
              You&apos;ve used your free messages. Keep the conversation going:
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={onUpgradeClick}
                className="text-xs bg-coral-500 hover:bg-coral-600 text-white font-medium px-4 py-1.5 rounded-lg transition-colors"
              >
                Get More Messages
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      {!isLocked && (
        <div className="p-3 border-t border-cream-200 flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-4 py-2 rounded-xl border border-cream-300 bg-cream-50 text-navy-700 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-coral-500 hover:bg-coral-600 disabled:opacity-40 text-white rounded-xl px-3 py-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
