import { blogPosts } from '@/data/posts';
import PostsByFilter from '@/components/blog/PostsByFilter';
import { notFound } from 'next/navigation';

interface AuthorPageProps {
  params: {
    author: string;
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const { author } = params;
  const decodedAuthor = decodeURIComponent(author);
  
  const filteredPosts = blogPosts.filter(post => 
    post.author.toLowerCase() === decodedAuthor.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <PostsByFilter 
      posts={filteredPosts}
      filterType="author"
      filterValue={decodedAuthor}
    />
  );
} 