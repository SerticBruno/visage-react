import { blogPosts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import InteractiveLink from '@/components/blog/InteractiveLink';
import { formatDate, toSlug } from '@/lib/utils';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import { Metadata } from 'next';

interface AuthorPageProps {
  params: Promise<{
    author: string;
  }>;
}

export async function generateMetadata(
  props: AuthorPageProps
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const author = blogPosts.find(post => toSlug(post.author) === resolvedParams.author)?.author;
  
  if (!author) {
    return {
      title: 'Autor nije pronađen',
    };
  }

  const authorPosts = blogPosts.filter(post => post.author === author);
  const totalPosts = authorPosts.length;

  return {
    title: `${author} - Blog`,
    description: `Pregledajte ${totalPosts} ${totalPosts === 1 ? 'članak' : 'članaka'} autora ${author} na blogu VISAGE Studija. Stručni članci o estetskoj medicini i kozmetičkim tretmanima.`,
    keywords: [author, "blog", "autor", "estetska medicina", "kozmetički tretmani", "VISAGE studio"],
    openGraph: {
      title: `${author} - Blog`,
      description: `Pregledajte ${totalPosts} ${totalPosts === 1 ? 'članak' : 'članaka'} autora ${author} na blogu VISAGE Studija. Stručni članci o estetskoj medicini i kozmetičkim tretmanima.`,
      images: [
        {
          url: "/images/services/toskani-woman-visage-estetski-studio.webp",
          width: 1200,
          height: 630,
          alt: `VISAGE Studio - Blog - ${author}`
        }
      ]
    }
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = await params;
  // Find the author by matching the slug
  const author = blogPosts.find(post => toSlug(post.author) === resolvedParams.author)?.author;
  
  if (!author) {
    notFound();
  }

  const authorPosts = blogPosts.filter(post => post.author === author);

  const totalPosts = authorPosts.length;
  const latestPost = authorPosts[0];
  const allTags = Array.from(new Set(authorPosts.flatMap(post => post.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Author Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={`/images/authors/author.webp`}
                  alt={author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {author}
                </h1>
                <p className="text-slate-600 mb-6">
                  Autor {totalPosts} {totalPosts === 1 ? 'članka' : 'članaka'} na našem blogu
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {allTags.map((tag) => (
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
                      <FaTag className="w-4 h-4" />
                      {latestPost.tags.map((tag) => (
                        <InteractiveLink
                          key={tag}
                          href={`/blog/kategorija/${toSlug(tag)}`}
                          className="hover:text-slate-900 transition-colors"
                        >
                          {tag}
                        </InteractiveLink>
                      ))}
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
                    className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Pročitaj više
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Svi članci autora - {author}</h2>
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
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
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
                      {post.tags.slice(0, 3).map((tag) => (
                        <InteractiveLink
                          key={tag}
                          href={`/blog/kategorija/${toSlug(tag)}`}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-all duration-300 hover:shadow-sm"
                        >
                          {tag}
                        </InteractiveLink>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Povratak na blog</span>
            </Link>
          </div>
        </div>
      </div>
      <NewsletterCTASection/>
      <ContactSection/>
    </div>
  );
} 