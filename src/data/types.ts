export interface TextSpan {
  type: 'text';
  text: string;
  style?: 'bold' | 'italic';
}

export interface LinkSpan {
  type: 'link';
  text: string;
  href: string;
}

export interface TextContent {
  type: 'text';
  text: (TextSpan | LinkSpan)[];
}

export interface ImageContent {
  type: 'image';
  src: string;
  alt: string;
  caption: string;
}

export interface HeadingContent {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export type ContentItem = 
  | HeadingContent 
  | TextContent 
  | ImageContent;

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentItem[];
  date: Date;
  author: string;
  tags: string[];
  image: string;
} 