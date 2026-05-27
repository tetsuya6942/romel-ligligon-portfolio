export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  tags: string[];
  link: string;
  year: string;
  client: string;
  credits: string;
}

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  warning?: string;
}

export interface ServerStatus {
  supabaseConfigured: boolean;
  fallbackMode: boolean;
  environmentTime: string;
}
