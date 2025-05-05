export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: (TextContent | ImageContent)[];
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

interface TextContent {
  type: 'text';
  text: string;
}

interface ImageContent {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
} 