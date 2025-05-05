import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import InteractiveLink from '@/components/blog/InteractiveLink';
import { formatDate } from '@/lib/utils';

interface AuthorPageProps {
  params: {
    author: string;
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const decodedAuthor = decodeURIComponent(params.author);
  const authorPosts = blogPosts.filter(post => post.author === decodedAuthor);

  if (authorPosts.length === 0) {
    notFound();
  }

  const totalPosts = authorPosts.length;
  const latestPost = authorPosts[0];
  const allTags = Array.from(new Set(authorPosts.flatMap(post => post.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Povratak na blog</span>
        </Link>
      </div>

      {/* Author Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={`/images/authors/author.webp`}
                  // src={`/images/team/${decodedAuthor.toLowerCase().replace(/\s+/g, '-')}.webp`}
                  alt={decodedAuthor}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {decodedAuthor}
                </h1>
                <p className="text-gray-600 mb-6">
                  Autor {totalPosts} {totalPosts === 1 ? 'članka' : 'članaka'} na našem blogu
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {allTags.map((tag) => (
                    <InteractiveLink
                      key={tag}
                      href={`/blog/kategorija/${tag}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </InteractiveLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Latest Post */}
          {latestPost && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Najnoviji članak</h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-[21/9] w-full">
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{formatDate(latestPost.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTag className="w-4 h-4" />
                      {latestPost.tags.map((tag) => (
                        <InteractiveLink
                          key={tag}
                          href={`/blog/kategorija/${tag}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {tag}
                        </InteractiveLink>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {latestPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {latestPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${latestPost.slug}`}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Pročitaj više
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Svi članci</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/9] w-full">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <InteractiveLink
                          key={tag}
                          href={`/blog/kategorija/${tag}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </InteractiveLink>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 