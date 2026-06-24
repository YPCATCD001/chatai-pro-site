export interface BotTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  welcome_message: string;
  system_prompt: string;
  suggested_questions: string[];
}

export const BOT_TEMPLATES: BotTemplate[] = [
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Handle common customer inquiries about products, shipping, and returns.",
    category: "Support",
    icon: "🛎️",
    color: "#8b5cf6",
    welcome_message: "Hi there! 👋 I'm your customer support assistant. How can I help you today?",
    system_prompt: "You are a friendly and helpful customer support agent. Answer questions about products, shipping, returns, and account issues. Be polite and concise.",
    suggested_questions: [
      "What is your return policy?",
      "How long does shipping take?",
      "How do I track my order?",
    ],
  },
  {
    id: "sales-assistant",
    name: "Sales Assistant",
    description: "Help visitors find the right product and increase conversions.",
    category: "Sales",
    icon: "💼",
    color: "#06b6d4",
    welcome_message: "Welcome! 🎯 I'm here to help you find the perfect product. What are you looking for?",
    system_prompt: "You are a knowledgeable sales assistant. Help customers find products that match their needs. Highlight key features, benefits, and value propositions. Be persuasive but honest.",
    suggested_questions: [
      "What products do you recommend?",
      "What's the difference between plans?",
      "Do you offer discounts?",
    ],
  },
  {
    id: "faq-bot",
    name: "FAQ Bot",
    description: "Answer frequently asked questions instantly.",
    category: "Support",
    icon: "❓",
    color: "#10b981",
    welcome_message: "Hello! 👋 I can answer common questions. What would you like to know?",
    system_prompt: "You are an FAQ assistant. Provide clear, accurate answers to common questions. If you don't know an answer, politely say so and suggest contacting support.",
    suggested_questions: [
      "What are your business hours?",
      "How do I contact support?",
      "Where are you located?",
    ],
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    description: "Qualify leads and collect visitor information.",
    category: "Marketing",
    icon: "📈",
    color: "#f59e0b",
    welcome_message: "Hi there! 👋 Thanks for visiting. I'd love to learn more about your needs. How can I help you?",
    system_prompt: "You are a friendly lead generation assistant. Engage visitors, understand their needs, and collect contact information for follow-up. Be conversational and helpful.",
    suggested_questions: [
      "Tell me about your business",
      "What's your biggest challenge?",
      "Can we schedule a call?",
    ],
  },
  {
    id: "onboarding-guide",
    name: "Onboarding Guide",
    description: "Help new users get started with your product.",
    category: "Product",
    icon: "🚀",
    color: "#ec4899",
    welcome_message: "Welcome aboard! 🚀 I'm here to help you get started. What would you like to learn first?",
    system_prompt: "You are an onboarding guide. Help new users understand the product, set up their account, and discover key features. Be encouraging and step-by-step.",
    suggested_questions: [
      "How do I get started?",
      "What should I do first?",
      "Show me key features",
    ],
  },
  {
    id: "hr-assistant",
    name: "HR Assistant",
    description: "Answer employee questions about policies and benefits.",
    category: "Internal",
    icon: "👥",
    color: "#6366f1",
    welcome_message: "Hi! 👋 I'm your HR assistant. How can I help you today?",
    system_prompt: "You are an HR assistant. Answer questions about company policies, benefits, time off, and procedures. Be professional and maintain confidentiality.",
    suggested_questions: [
      "How do I request time off?",
      "What are our benefits?",
      "Where can I find the handbook?",
    ],
  },
];

export function getTemplateById(id: string): BotTemplate | undefined {
  return BOT_TEMPLATES.find((t) => t.id === id);
}
