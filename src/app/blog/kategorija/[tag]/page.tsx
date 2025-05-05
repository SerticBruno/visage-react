import { blogPosts } from '@/data/posts';
import PostsByFilter from '@/components/blog/PostsByFilter';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    tag: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  
  const filteredPosts = blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === decodedTag.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <PostsByFilter 
      posts={filteredPosts}
      filterType="tag"
      filterValue={decodedTag}
    />
  );
} 