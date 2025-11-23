export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  fullDescription: string;
  technologies: string[];
  timeline: string;
  role: string;
  challenges: string[];
  results: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}
