import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RelatedArticles from '@/components/blog/RelatedArticles';
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa';
import { formatDate, toSlug } from '@/lib/utils';
import { ElementType } from 'react';
import { TextContent } from '@/data/types';
import InteractiveLink from '@/components/blog/InteractiveLink';
import { Metadata } from 'next';
import Link from 'next/link';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';

type SegmentParams = {
  slug: string;
}

export async function generateMetadata(
  props: { params: Promise<SegmentParams> }
): Promise<Metadata> {
  const params = await props.params;
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
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
              className={span.style === 'bold' ? 'font-bold' : span.style === 'italic' ? 'italic' : ''}
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

export default async function BlogPostPage(
  props: { params: Promise<SegmentParams> }
) {
  const params = await props.params;
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
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
            <div className="flex items-center justify-center gap-4 text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                <InteractiveLink 
                  href={`/blog/autor/${toSlug(post.author)}`}
                  className="hover:text-slate-700 transition-colors"
                >
                  {post.author}
                </InteractiveLink>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <InteractiveLink
                  key={tag}
                  href={`/blog/kategorija/${toSlug(tag)}`}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-all duration-300 hover:shadow-sm"
                >
                  {tag}
                </InteractiveLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-lg p-8 border border-slate-100">
            <div className="prose prose-lg max-w-none">
              {post.content.map((item, index) => {
                if (item.type === 'heading') {
                  const Tag = `h${item.level}` as ElementType;
                  return (
                    <Tag 
                      key={`heading-${index}`}
                      className={`font-bold text-slate-900 mb-4 ${
                        item.level === 1 ? 'text-4xl' :
                        item.level === 2 ? 'text-3xl' :
                        item.level === 3 ? 'text-2xl' : ''
                      }`}
                    >
                      {item.text}
                    </Tag>
                  );
                } else if (item.type === 'image') {
                  return (
                    <figure key={`figure-${index}`} className="my-8">
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="text-center text-slate-600 mt-2">
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
          </article>

          {/* Related Articles */}
          <div className="mt-12">
            <RelatedArticles currentPost={post} allPosts={blogPosts} />
          </div>
        </div>
      </div>
      <NewsletterCTASection/>
      <ContactSection/>
    </div>
  );
} 