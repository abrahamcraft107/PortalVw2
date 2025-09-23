export interface System {
  id: string;
  name: string;
  description?: string;
  type: 'email' | 'email-complete' | 'vocal' | 'chatbot' | 'presentation';
  status: 'active' | 'inactive' | 'maintenance';
  lastAccessed?: string;
  data?: SystemData;
}

export interface SystemData {
  // Email system data
  emailsSent?: number;
  
  // Vocal system data
  callsToday?: number;
  minutesToday?: number;
  monthlyMinutes?: number;
  
  // Chatbot data
  messagesSent?: number;
  
  // Presentation data
  creditsLeft?: number;
  renewalDate?: string;
  documentsCreated?: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}