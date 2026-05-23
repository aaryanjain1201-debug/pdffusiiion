import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          PDFFusion Blog & Guides
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tutorials, security guides, and productivity tips to help you manage your digital documents efficiently.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 glass"
          >
            <div>
              {/* Meta tags */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-bold text-primary uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
              </div>

              {/* Title & Excerpt */}
              <h3 className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            {/* Read action */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-primary flex items-center gap-1 group"
              >
                Read Article
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
