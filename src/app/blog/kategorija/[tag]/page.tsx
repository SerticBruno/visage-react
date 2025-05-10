import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import InteractiveLink from '@/components/blog/InteractiveLink';
import { formatDate } from '@/lib/utils';

interface CategoryPageProps {
  params: {
    tag: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  const categoryPosts = blogPosts.filter(post => 
    post.tags.some(tag => tag === decodedTag)
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  const totalPosts = categoryPosts.length;
  const latestPost = categoryPosts[0];
  const allAuthors = Array.from(new Set(categoryPosts.map(post => post.author)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Povratak na blog</span>
        </Link>
      </div>

      {/* Category Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <FaTag className="w-8 h-8 text-slate-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {decodedTag}
              </h1>
              <p className="text-slate-600 mb-6">
                {totalPosts} {totalPosts === 1 ? 'članak' : 'članaka'} u ovoj kategoriji
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {allAuthors.map((author) => (
                  <InteractiveLink
                    key={author}
                    href={`/blog/autor/${encodeURIComponent(author)}`}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-all duration-300 hover:shadow-sm"
                  >
                    {author}
                  </InteractiveLink>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Post */}
          {latestPost && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Najnoviji članak</h2>
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
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{formatDate(latestPost.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4" />
                      <InteractiveLink
                        href={`/blog/autor/${encodeURIComponent(latestPost.author)}`}
                        className="hover:text-slate-900 transition-colors"
                      >
                        {latestPost.author}
                      </InteractiveLink>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {latestPost.title}
                  </h3>
                  <p className="text-slate-600 mb-6">
                    {latestPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${latestPost.slug}`}
                    className="inline-block px-6 py-3 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Pročitaj više
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Svi članci</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
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
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4" />
                        <InteractiveLink
                          href={`/blog/autor/${encodeURIComponent(post.author)}`}
                          className="hover:text-slate-900 transition-colors"
                        >
                          {post.author}
                        </InteractiveLink>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <InteractiveLink
                          key={tag}
                          href={`/blog/kategorija/${tag}`}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-all duration-300 hover:shadow-sm"
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