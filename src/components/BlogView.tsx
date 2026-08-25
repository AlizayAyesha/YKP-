import React, { useEffect, useState } from 'react';
import { BLOG_POSTS } from '../data/youthData';
import { BlogPost } from '../types';
import { ArrowRight, X } from 'lucide-react';
import { applyDocumentSeo, blogPostFromPath, seoPageFromPath } from '../lib/seo';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() =>
    blogPostFromPath(window.location.pathname)
  );

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.history.pushState({ tab: 'blog', slug: post.slug }, '', `/blog/${post.slug}`);
    applyDocumentSeo(seoPageFromPath(`/blog/${post.slug}`));
  };

  const closePost = () => {
    setSelectedPost(null);
    window.history.pushState({ tab: 'blog' }, '', '/blog');
    applyDocumentSeo(seoPageFromPath('/blog'));
  };

  useEffect(() => {
    const onPop = () => setSelectedPost(blogPostFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative bg-section-green text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Youth insights
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold italic text-white tracking-tight">
            Stories &amp; ideas
          </h1>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            News, stories, and guidance for youth building their path across Pakistan.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-canvas-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer flex flex-col"
                onClick={() => openPost(post)}
              >
                <div className="aspect-[16/11] overflow-hidden mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)] mb-2">
                  {post.date}
                </p>
                <h2 className="font-display text-xl font-semibold text-[var(--ykp-ink)] group-hover:text-[var(--ykp-green)] transition-colors leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--ykp-muted)] leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)]">
                  Read article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ykp-green-deep)]/70 backdrop-blur-sm">
          <article className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)]">
                {selectedPost.category}
              </p>
              <button
                type="button"
                onClick={() => closePost()}
                className="text-[var(--ykp-muted)] hover:text-[var(--ykp-ink)] p-2 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ykp-ink)] leading-snug">
              {selectedPost.title}
            </h2>
            <p className="text-xs text-[var(--ykp-muted)]">
              {selectedPost.author} · {selectedPost.date}
            </p>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-56 object-cover"
            />
            <p className="text-[var(--ykp-muted)] text-sm leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </p>
            <button
              type="button"
              onClick={() => closePost()}
              className="text-sm font-semibold text-[var(--ykp-green)] link-underline cursor-pointer"
            >
              Close
            </button>
          </article>
        </div>
      )}
    </div>
  );
};
