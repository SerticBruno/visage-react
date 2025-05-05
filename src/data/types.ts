export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: (TextContent | ImageContent | HeadingContent)[];
  date: string;
  author: string;
  tags: string[];
  image: string;
}

export interface TextContent {
  type: 'text';
  text: string | (TextSpan | LinkSpan)[];
}

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

export interface HeadingContent {
  type: 'heading';
  text: string;
  level: 1 | 2 | 3 | 4;
}

export interface ImageContent {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
} 