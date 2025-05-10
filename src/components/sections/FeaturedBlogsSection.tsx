import Link from 'next/link';
import { BlogPost } from '@/data/types';
import BlogPostCard from '@/components/ui/BlogPostCard';

interface FeaturedBlogsSectionProps {
  posts: BlogPost[];
}

export default function FeaturedBlogsSection({ posts }: FeaturedBlogsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Izdvojeni članci</h2>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Pogledajte sve članke →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
} 