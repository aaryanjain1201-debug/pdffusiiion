import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdffusiiion.vercel.app';

  // Base pages list
  const baseRoutes = [
    '',
    '/pricing',
    '/contact',
    '/privacy',
    '/terms',
    '/tools/merge-pdf',
    '/tools/compress-pdf',
    '/tools/jpg-to-pdf',
    '/tools/pdf-to-image',
    '/tools/image-to-pdf',
    '/blog',
  ];

  const routes = baseRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Blog Posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
