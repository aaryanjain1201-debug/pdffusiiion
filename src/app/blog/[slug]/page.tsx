import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // A simple, dependency-free renderer that maps Markdown-style content to styled TSX components
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground mt-8 mb-4">
            {trimmed.slice(2)}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-bold text-foreground mt-6 mb-3">
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-foreground mt-4 mb-2">
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="list-disc ml-6 text-sm text-muted-foreground leading-relaxed mt-1">
            {trimmed.slice(2)}
          </li>
        );
      }
      if (trimmed === '---') {
        return <hr key={idx} className="my-6 border-border" />;
      }
      if (trimmed === '') {
        return <div key={idx} className="h-2" />;
      }
      
      // Inline formatting check (e.g. strong/code)
      return (
        <p key={idx} className="text-sm text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{
          __html: trimmed
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="bg-secondary px-1.5 py-0.5 rounded text-primary text-xs font-mono font-semibold">$1</code>')
            .replace(/&rarr;/g, '&rarr;')
        }} />
      );
    });
  };

  // Article JSON-LD Schema for rich snippet indexing
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'datePublished': post.date,
    'author': {
      '@type': 'Organization',
      'name': 'PDFFusion',
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
        Back to Blog Feed
      </Link>

      {/* Hero Info */}
      <header className="border-b border-border pb-6 mb-8">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-bold text-primary uppercase tracking-wider">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          {post.title}
        </h1>
      </header>

      {/* Content Area */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderContent(post.content)}
      </div>

      {/* Next Step CTA */}
      <div className="mt-16 p-8 rounded-2xl border border-border bg-secondary/15 glass flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-bold text-lg">Secure Document Workflows</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Try our 100% private client-side utilities without uploading files.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap text-sm"
        >
          Try PDFFusion Now
        </Link>
      </div>
    </article>
  );
}
