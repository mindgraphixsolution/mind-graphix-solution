import { Metadata } from 'next';
import BlogPostPage from '@/components/pages/BlogPostPage';
import { BLOG_POSTS } from '@/lib/constants';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.id === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Mind Graphix',
    };
  }

  return {
    title: `${post.title} | Mind Graphix Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function Page() {
  return <BlogPostPage />;
}
