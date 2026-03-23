"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { SmartButtons } from "@/components/SmartButtons";
import { generateSmartButtons, cleanText } from "@/lib/smartButtons";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { readProfile } from "@/lib/readProfile";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatPage() {
  const { language } = useLanguage();
  const profile = readProfile(language);
  const firstName = profile.name.split(' ')[0];
  const texts = {
    fr: {
      initialMessage: (name: string) =>
        `Salut ! Je suis l'assistant IA de ${name}. Je peux répondre à vos questions sur son parcours, ses projets, ses compétences, ou tout autre sujet lié à son profil. Que souhaitez-vous savoir ?`,
      error: "Désolé, une erreur s'est produite. Veuillez réessayer ou me contacter directement via la page contact.",
      headerTitle: (name: string) => `Chat avec ${name}`,
      headerSubtitle: "Assistant IA alimenté par RAG",
      badge: "Posez-moi des questions sur mon parcours",
      suggestedLabel: "Questions suggérées :",
      suggestions: (name: string) => [
        `Quel est le parcours académique de ${name} ?`,
        "Quelles sont ses compétences techniques ?",
        "Peux-tu me parler de ses projets ?",
        "Comment le contacter ?",
        `Quelle est son expérience en IA ?`,
      ],
      placeholder: (name: string) => `Posez une question sur ${name}...`,
      thinking: (name: string) => `${name} réfléchit...`,
    },
    en: {
      initialMessage: (name: string) =>
        `Hi! I'm ${name}'s AI assistant. I can answer questions about his background, projects, skills, or anything else related to his profile. What would you like to know?`,
      error: "Sorry, something went wrong. Please try again or contact me directly through the contact page.",
      headerTitle: (name: string) => `Chat with ${name}`,
      headerSubtitle: "AI assistant powered by RAG",
      badge: "Ask me anything about my background",
      suggestedLabel: "Suggested questions:",
      suggestions: (name: string) => [
        `What is ${name}'s academic background?`,
        "What are his technical skills?",
        "Can you tell me about his projects?",
        "How can I contact him?",
        `What is his experience in AI?`,
      ],
      placeholder: (name: string) => `Ask a question about ${name}...`,
      thinking: (name: string) => `${name} is thinking...`,
    },
  }[language];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: texts.initialMessage(profile.name),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Appel à l'API RAG
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        throw new Error('Erreur de l\'API');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: texts.error,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  const suggestedQuestions = texts.suggestions(firstName);

  return (
    <div className="min-h-screen bg-surface-base pt-20">
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-cyan-accent rounded-full flex items-center justify-center mr-4 shadow-glow-violet">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white">{texts.headerTitle(firstName)}</h1>
                <p className="text-slate-400">{texts.headerSubtitle}</p>
              </div>
            </div>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {texts.badge}
            </Badge>
          </motion.div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-strong h-[650px] flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user"
                              ? "bg-accent text-white ml-3"
                              : "bg-gradient-to-br from-violet-600 to-cyan-accent text-white mr-3"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-accent text-white rounded-2xl rounded-tr-sm"
                              : "glass text-slate-200 rounded-2xl rounded-tl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-line">{cleanText(message.content)}</p>

                          {/* Boutons de redirection pour les messages du bot */}
                          {message.sender === "bot" && (
                            <SmartButtons
                              buttons={generateSmartButtons(message.content)}
                              className="mt-3"
                            />
                          )}

                          <p
                            className={`text-xs mt-2 ${
                              message.sender === "user" ? "text-violet-200" : "text-slate-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-accent text-white mr-3 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="px-4 py-3 glass text-slate-300 rounded-2xl rounded-tl-sm">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{texts.thinking(firstName)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-white/[0.08]">
                  <p className="text-sm text-slate-400 mb-3">{texts.suggestedLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="border border-accent/30 text-accent-light hover:bg-accent/10 text-sm px-3 py-1 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.08]">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={texts.placeholder(firstName)}
                    className="flex-1 bg-surface-overlay border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-4 py-2 focus:ring-2 focus:ring-accent/50 focus:border-accent/50 focus:outline-none transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-2 bg-accent hover:bg-violet-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
