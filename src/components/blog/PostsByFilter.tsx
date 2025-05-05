import { BlogPost } from '@/data/types';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import InteractiveLink from './InteractiveLink';

interface PostsByFilterProps {
  posts: BlogPost[];
  filterType: 'tag' | 'author';
  filterValue: string;
}

export default function PostsByFilter({ posts, filterType, filterValue }: PostsByFilterProps) {
  const title = filterType === 'tag' 
    ? `Članci u kategoriji: ${filterValue}`
    : `Članci autora: ${filterValue}`;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4" />
                        <InteractiveLink 
                          href={`/blog/autor/${post.author}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.author}
                        </InteractiveLink>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 