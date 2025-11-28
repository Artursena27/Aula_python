export enum ContentType {
  OOP = 'oop',
  API = 'api'
}

export interface Example {
  title: string;
  analogy: string;
  code: string;
  explanation: string;
}

export interface LessonContent {
  title: string;
  introduction: string;
  keyConcepts: string[];
  examples: Example[];
}

export interface MenuItem {
  id: ContentType;
  title: string;
  description: string;
  icon: string;
}