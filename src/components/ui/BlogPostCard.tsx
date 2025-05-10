import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <article className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
        <div className="relative h-48 w-full bg-slate-50 overflow-hidden flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-slate-500 mt-auto">
            <span>{post.author}</span>
            <time>{formatDate(post.date)}</time>
          </div>
        </div>
      </article>
    </Link>
  );
} 