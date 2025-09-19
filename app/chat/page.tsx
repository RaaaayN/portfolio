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

  // Défilement automatique supprimé
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

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
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{texts.headerTitle(firstName)}</h1>
                <p className="text-gray-600">{texts.headerSubtitle}</p>
              </div>
            </div>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {texts.badge}
            </Badge>
          </div>

          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white ml-3"
                          : "bg-gray-200 text-gray-600 mr-3"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
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
                          message.sender === "user" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 mr-3 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{texts.thinking(firstName)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">{texts.suggestedLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={texts.placeholder(firstName)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
