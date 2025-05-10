import Link from 'next/link';
import { BlogPost } from '@/data/types';
import BlogPostCard from '@/components/ui/BlogPostCard';
import { FaArrowRight } from 'react-icons/fa';

interface FeaturedBlogsSectionProps {
  posts: BlogPost[];
}

export default function FeaturedBlogsSection({ posts }: FeaturedBlogsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Izdvojeni članci</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otkrijte najnovije savjete i trendove iz svijeta estetske medicine. Naši stručnjaci dijele svoje znanje i iskustvo kroz detaljne članke o najmodernijim tretmanima i tehnikama.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">Pogledajte sve članke</span>
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
} 