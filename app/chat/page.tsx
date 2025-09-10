"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Salut ! Je suis l'assistant IA de Rayan. Je peux répondre à vos questions sur son parcours, ses projets, ses compétences, ou tout autre sujet lié à son profil. Que souhaitez-vous savoir ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // Simulation d'une réponse RAG (à remplacer par une vraie API)
      const response = await simulateRAGResponse(input.trim());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000 + Math.random() * 2000); // Simulation du délai de traitement
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const simulateRAGResponse = async (question: string): Promise<string> => {
    // Simulation de réponses basées sur le profil de Rayan
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("parcours") || lowerQuestion.includes("formation") || lowerQuestion.includes("études")) {
      return "Rayan est actuellement en 4e année d'école d'ingénieur informatique à l'UTC (Université de Technologie de Compiègne), spécialisé en Intelligence Artificielle et Data Science. Il a suivi des classes préparatoires au Lycée Louis-le-Grand avant d'intégrer l'UTC. Son parcours académique est axé sur l'innovation technologique et la valorisation des données.";
    }
    
    if (lowerQuestion.includes("compétences") || lowerQuestion.includes("technologies") || lowerQuestion.includes("langages")) {
      return "Rayan maîtrise plusieurs domaines : les langages de programmation (Python, C++, JavaScript, TypeScript, R), l'Intelligence Artificielle (Machine Learning, Deep Learning, NLP, RAG), le développement web (React, Next.js, Node.js), et les outils de data science (Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch). Il a également des compétences en gestion d'équipe et en leadership.";
    }
    
    if (lowerQuestion.includes("projets") || lowerQuestion.includes("réalisations")) {
      return "Parmi ses projets notables : un système de recommandation IA utilisant des techniques de machine learning, une application web de data science avec des tableaux de bord interactifs, et un projet RAG (Retrieval-Augmented Generation) pour la génération de réponses contextuelles. Il a également dirigé la Junior-Entreprise UTC en tant que Président.";
    }
    
    if (lowerQuestion.includes("expérience") || lowerQuestion.includes("professionnel") || lowerQuestion.includes("travail")) {
      return "Rayan a une expérience significative en gestion d'équipe en tant que Président de la Junior-Entreprise UTC (2023-2024), où il dirigeait 15 personnes. Il a également été Responsable Recrutement et a effectué des stages en développement, notamment chez TechCorp Solutions où il a travaillé sur des projets d'IA et de développement web.";
    }
    
    if (lowerQuestion.includes("contact") || lowerQuestion.includes("email") || lowerQuestion.includes("téléphone")) {
      return "Vous pouvez contacter Rayan par email à rayan.barre@icloud.com ou par téléphone au +33 7 82 59 80 57. Il est également présent sur LinkedIn (https://www.linkedin.com/in/rayan-barreddine/) et GitHub (https://github.com/RaaaayN). Il est disponible à partir de juillet 2025.";
    }
    
    if (lowerQuestion.includes("junior") || lowerQuestion.includes("entreprise")) {
      return "Rayan a été Président de la Junior-Entreprise UTC de 2023 à 2024. Cette expérience lui a permis de développer ses compétences en management, gestion de projets, communication et leadership. Il dirigeait une équipe de 15 personnes et gérait le développement commercial et la formation des membres.";
    }
    
    if (lowerQuestion.includes("ia") || lowerQuestion.includes("intelligence artificielle") || lowerQuestion.includes("machine learning")) {
      return "Rayan est spécialisé en Intelligence Artificielle et Data Science. Il travaille sur des projets de machine learning, deep learning, NLP (Natural Language Processing), et RAG (Retrieval-Augmented Generation). Il maîtrise des frameworks comme TensorFlow, PyTorch, et des outils de data science comme Pandas, NumPy, et Scikit-learn.";
    }
    
    // Réponse par défaut
    return "Je suis l'assistant IA de Rayan Barreddine, étudiant en 4e année d'ingénieur informatique spécialisé en IA et Data Science à l'UTC. Je peux vous renseigner sur son parcours académique, ses compétences techniques, ses projets, son expérience professionnelle, ou ses coordonnées. Que souhaitez-vous savoir de plus spécifique ?";
  };

  const suggestedQuestions = [
    "Quel est le parcours académique de Rayan ?",
    "Quelles sont ses compétences techniques ?",
    "Peux-tu me parler de ses projets ?",
    "Comment le contacter ?",
    "Quelle est son expérience en IA ?",
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">Chat avec Rayan</h1>
                <p className="text-gray-600">Assistant IA alimenté par RAG</p>
              </div>
            </div>
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Posez-moi des questions sur mon parcours
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
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
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
                        <span>Rayan réfléchit...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Questions suggérées :</p>
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
                  placeholder="Posez une question sur Rayan..."
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
