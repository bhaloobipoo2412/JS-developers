export type CourseCategory = 'all' | 'web-app' | 'creative-ai' | 'career-skills';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'web-app' | 'creative-ai' | 'career-skills';
  level: 'Beginner to Pro' | 'Intermediate' | 'Advanced';
  duration: string;
  tools: string[];
  description: string;
  modules: string[];
  featured?: boolean;
  softwareHouseCertified: boolean;
}

export interface RoadmapStep {
  step: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  duration: string;
  focus: string;
}

export interface TechItem {
  name: string;
  category: string;
  color: string;
  iconName: string;
  accent: string;
  description: string;
}
