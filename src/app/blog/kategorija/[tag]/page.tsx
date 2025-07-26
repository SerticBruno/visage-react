import { blogPosts } from '@/data/posts';
import { blogCategories } from '@/data/blogCategories';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BLOG_ENABLED } from '@/lib/config';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import InteractiveLink from '@/components/blog/InteractiveLink';
import { formatDate, toSlug } from '@/lib/utils';
import ContactSection from '@/components/sections/ContactSection';
import NewsletterCTASection from '@/components/sections/NewsletterCTASection';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata(
  props: CategoryPageProps
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const category = blogCategories.find(cat => toSlug(cat.name) === resolvedParams.tag);
  
  if (!category) {
    return {
      title: 'Kategorija nije pronađena',
    };
  }

  const categoryPosts = blogPosts.filter(post => post.category === category.id);
  const totalPosts = categoryPosts.length;

  return {
    title: `${category.name} - Blog`,
    description: `Pregledajte ${totalPosts} ${totalPosts === 1 ? 'članak' : 'članaka'} u kategoriji ${category.name} na blogu VISAGE Studija. Stručni članci o estetskoj medicini i kozmetičkim tretmanima.`,
    keywords: [category.name, "blog", "estetska medicina", "kozmetički tretmani", "VISAGE studio"],
    openGraph: {
      title: `${category.name} - Blog`,
      description: `Pregledajte ${totalPosts} ${totalPosts === 1 ? 'članak' : 'članaka'} u kategoriji ${category.name} na blogu VISAGE Studija. Stručni članci o estetskoj medicini i kozmetičkim tretmanima.`,
      images: [
        {
          url: "/images/services/toskani-woman-visage-estetski-studio.webp",
          width: 1200,
          height: 630,
          alt: `VISAGE Studio - Blog - ${category.name}`
        }
      ]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Redirect to 404 if blog is disabled
  if (!BLOG_ENABLED) {
    notFound();
  }

  const resolvedParams = await params;
  // Find the category by matching the slug
  const category = blogCategories.find(cat => toSlug(cat.name) === resolvedParams.tag);
  
  if (!category) {
    notFound();
  }

  const categoryPosts = blogPosts.filter(post => post.category === category.id);

  const totalPosts = categoryPosts.length;
  const latestPost = categoryPosts[0];
  const allAuthors = Array.from(new Set(categoryPosts.map(post => post.author)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: category.color }}>
                <FaTag className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {category.name}
              </h1>
              <p className="text-slate-600 mb-6">
                {category.description}
              </p>
              <p className="text-slate-600 mb-6">
                {totalPosts} {totalPosts === 1 ? 'članak' : 'članaka'} u ovoj kategoriji
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {allAuthors.map((author) => (
                  <InteractiveLink
                    key={author}
                    href={`/blog/autor/${toSlug(author)}`}
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
                        href={`/blog/autor/${toSlug(latestPost.author)}`}
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
                    className="inline-block px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Pročitajte više
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Svi članci u kategoriji - {category.name}</h2>
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
                          href={`/blog/autor/${toSlug(post.author)}`}
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