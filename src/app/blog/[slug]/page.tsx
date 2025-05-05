import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RelatedArticles from '@/components/blog/RelatedArticles';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <div className="prose max-w-none">
            {post.content.map((item, index) => {
              if (item.type === 'text') {
                return item.text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={`${index}-${pIndex}`} className="mb-4">
                    {paragraph}
                  </p>
                ));
              } else if (item.type === 'image') {
                return (
                  <figure key={index} className="my-8">
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {item.caption && (
                      <figcaption className="text-center text-gray-600 mt-2 text-sm">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </div>

          <RelatedArticles currentPost={post} allPosts={blogPosts} />
        </article>
      </div>
    </div>
  );
} 