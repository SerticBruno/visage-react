import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/data/types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export default function RelatedArticles({ currentPost, allPosts }: RelatedArticlesProps) {
  // Find next and previous posts
  const currentIndex = allPosts.findIndex(post => post.id === currentPost.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Find related posts based on tags with a more flexible matching system
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id) // Exclude current post
    .map(post => {
      // Calculate similarity score based on matching tags
      const matchingTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(currentTag.toLowerCase())
        )
      );
      return {
        post,
        score: matchingTags.length
      };
    })
    .filter(({ score }) => score > 0) // Only include posts with at least one matching tag
    .sort((a, b) => b.score - a.score) // Sort by number of matching tags
    .map(({ post }) => post)
    .slice(0, 3);

  // If no related posts found, show most recent posts instead
  const displayPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : allPosts
        .filter(post => post.id !== currentPost.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

  return (
    <div className="mt-16 space-y-12">
      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              {prevPost.image && (
                <Image
                  src={prevPost.image}
                  alt={prevPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <FaArrowLeft className="mr-2" />
                <span>Prethodni članak</span>
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                {prevPost.title}
              </h3>
            </div>
          </Link>
        ) : <div />}
        
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
                <span>Sljedeći članak</span>
                <FaArrowRight className="ml-2" />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                {nextPost.title}
              </h3>
            </div>
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              {nextPost.image && (
                <Image
                  src={nextPost.image}
                  alt={nextPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
          </Link>
        ) : <div />}
      </div>

      {/* Related Articles */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {relatedPosts.length > 0 ? 'Slični članci' : 'Najnoviji članci'}
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Pogledajte sve članke</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}