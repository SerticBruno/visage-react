import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RelatedArticles from '@/components/blog/RelatedArticles';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { ElementType } from 'react';
import { TextSpan, LinkSpan, TextContent, ImageContent, HeadingContent, ContentItem } from '@/data/types';
import Link from 'next/link';
import InteractiveLink from '@/components/blog/InteractiveLink';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

function renderListItems(text: string, parentIndex: number) {
  const items = text.split('\n').filter(line => line.trim().startsWith('•'));
  if (items.length === 0) return null;

  return (
    <ul key={`list-${parentIndex}`} className="list-disc pl-6 space-y-2 my-4">
      {items.map((item, index) => (
        <li key={`list-item-${parentIndex}-${index}`} className="text-gray-700">
          {item.replace('•', '').trim()}
        </li>
      ))}
    </ul>
  );
}

function renderTextContent(content: TextContent, index: number) {
  const text = content.text.map(span => span.text).join('');
  const listItems = renderListItems(text, index);
  if (listItems) return listItems;

  return (
    <p key={`text-${index}`} className="text-gray-700 mb-4">
      {content.text.map((span, spanIndex) => {
        if (span.type === 'text') {
          return (
            <span
              key={`span-${index}-${spanIndex}`}
              className={cn(
                span.style === 'bold' && 'font-bold',
                span.style === 'italic' && 'italic'
              )}
            >
              {span.text}
            </span>
          );
        } else if (span.type === 'link') {
          return (
            <InteractiveLink
              key={`link-${index}-${spanIndex}`}
              href={span.href}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {span.text}
            </InteractiveLink>
          );
        }
        return null;
      })}
    </p>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-8">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={100}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                <InteractiveLink 
                  href={`/blog/autor/${post.author}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.author}
                </InteractiveLink>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <InteractiveLink
                  key={tag}
                  href={`/blog/kategorija/${tag}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </InteractiveLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {post.content.map((item, index) => {
              if (item.type === 'heading') {
                const Tag = `h${item.level}` as ElementType;
                return (
                  <Tag 
                    key={`heading-${index}`}
                    className={cn(
                      'font-bold text-gray-900 mb-4',
                      item.level === 1 && 'text-4xl',
                      item.level === 2 && 'text-3xl',
                      item.level === 3 && 'text-2xl'
                    )}
                  >
                    {item.text}
                  </Tag>
                );
              } else if (item.type === 'image') {
                return (
                  <figure key={`figure-${index}`} className="my-8">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    {item.caption && (
                      <figcaption className="text-center text-gray-600 mt-2">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              } else if (item.type === 'text') {
                return renderTextContent(item, index);
              }
              return null;
            })}
          </div>

          <RelatedArticles currentPost={post} allPosts={blogPosts} />
        </div>
      </div>
    </div>
  );
} 