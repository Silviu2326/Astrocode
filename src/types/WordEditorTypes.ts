export interface WordEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (content: string, title: string) => void;
  initialContent?: string;
  initialTitle?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface AITemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  fields: { name: string; placeholder: string; required: boolean }[];
}

export interface SlashCommand {
  command: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
}