import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/types';
import { FaArrowRight } from 'react-icons/fa';

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
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer h-full grid grid-rows-[auto_1fr_auto]">
        <div className="relative h-64 w-full bg-slate-50 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-sm"
                style={{ background: 'rgb(241, 245, 249)', color: 'rgb(71, 85, 105)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="p-6 pt-0">
          <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100 mb-4">
            <span>{post.author}</span>
            <time>{formatDate(post.date)}</time>
          </div>
          <div
            className="group inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ background: 'linear-gradient(to right, rgb(15, 23, 42), rgb(30, 41, 59))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-medium">Pročitajte više</span>
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
} 