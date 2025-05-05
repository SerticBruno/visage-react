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
  caption?: string;
}

export interface HeadingContent {
  type: 'heading';
  level: 1 | 2 | 3;
  text: string;
}

export type ContentItem = TextContent | ImageContent | HeadingContent;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentItem[];
  image: string;
  date: string;
  author: string;
  tags: string[];
} 