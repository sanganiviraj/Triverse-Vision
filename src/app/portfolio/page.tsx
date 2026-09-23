'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/common/FadeIn';
import { PORTFOLIO_ITEMS, PortfolioItem, MASTERPIECE_POSTS, MasterpiecePost } from '@/data/portfolio';

export default function PortfolioPage() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'ugc' | 'brand'>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [playingReelId, setPlayingReelId] = useState<string | null>(null);
  const [showAllReels, setShowAllReels] = useState<boolean>(false);

  // Filtered items based on category
  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'ugc') return item.category === 'UGC';
    if (filterCategory === 'brand') return item.category === 'Brand Story';
    return true;
  });

  const MAX_REELS_DEFAULT = 6;
  const displayedItems = showAllReels ? filteredItems : filteredItems.slice(0, MAX_REELS_DEFAULT);
  const hasMoreReels = filteredItems.length > MAX_REELS_DEFAULT;

  const handleCategoryChange = (category: 'all' | 'ugc' | 'brand') => {
    setFilterCategory(category);
    setShowAllReels(false);
  };

  const handleToggleShowAll = () => {
    if (showAllReels) {
      setShowAllReels(false);
      const section = document.getElementById('portfolio-reels');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setShowAllReels(true);
    }
  };

  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="portfolio-page-wrapper">
      {/* ── 1. Hero Section ───────────────────────────── */}
      <section className="portfolio-hero">
        <div className="container">
          <FadeIn direction="up" delay={0.1} className="portfolio-hero-content">
            <div className="portfolio-badge">
              <span className="portfolio-badge-dot" />
              <span>Curated Visual Showcase • Live Feed</span>
            </div>
            <h1 className="portfolio-title">
              Content Engineered For{' '}
              <span className="text-gradient">The Algorithm & Authority.</span>
            </h1>
            <p className="portfolio-sub">
              Explore our live portfolio of high-retention Instagram Reels, UGC creator videos, and cinematic brand stories built for leaders who want to lead their industry online.
            </p>

            {/* Quick Metrics Ticker */}
            <div className="portfolio-metrics-bar">
              <div className="metric-pill">
                <strong>50M+</strong>
                <span>Organic Views</span>
              </div>
              <div className="metric-sep">•</div>
              <div className="metric-pill">
                <strong>100+</strong>
                <span>High-Converting Reels</span>
              </div>
              <div className="metric-sep">•</div>
              <div className="metric-pill">
                <strong>98%</strong>
                <span>Founder Retention</span>
              </div>
              <div className="metric-sep">•</div>
              <div className="metric-pill">
                <strong>4.8x</strong>
                <span>Avg Engagement Surge</span>
              </div>
            </div>
          </FadeIn>

          {/* ── 2. Filter Navigation Bar ─────────────────── */}
          <div className="portfolio-filter-container">
            {/* Main Format Tabs */}
            <div className="portfolio-type-tabs">
              <button
                className={`type-tab ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All Reels <span className="tab-count">({PORTFOLIO_ITEMS.length})</span>
              </button>
              <button
                className={`type-tab ${filterCategory === 'ugc' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('ugc')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                UGC Videos <span className="tab-count">({PORTFOLIO_ITEMS.filter(i => i.category === 'UGC').length})</span>
              </button>
              <button
                className={`type-tab ${filterCategory === 'brand' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('brand')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" />
                </svg>
                Brand Stories <span className="tab-count">({PORTFOLIO_ITEMS.filter(i => i.category === 'Brand Story').length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Creative Grid: Reels & Posts ─────────────── */}
      <section id="portfolio-reels" className="portfolio-grid-section">
        <div className="container">
          <div className="portfolio-feed-grid">
            {displayedItems.map((item, idx) => {
              const isLiked = !!likedItems[item.id];

              if (item.type === 'reel') {
                /* ── INSTAGRAM REEL CARD (9:16 Vertical) ── */
                return (
                  <FadeIn
                    direction="up"
                    delay={0.1 + (idx % 3) * 0.12}
                    key={item.id}
                    className="portfolio-grid-item reel-item"
                  >
                    <div
                      className="ig-reel-card"
                      onClick={() => setActiveModalItem(item)}
                      onMouseEnter={() => setPlayingReelId(item.id)}
                      onMouseLeave={() => setPlayingReelId(null)}
                    >
                      {/* Video / Poster View */}
                      <div className="ig-reel-media">
                        {item.video && playingReelId === item.id ? (
                          <video
                            src={item.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="ig-reel-video"
                          />
                        ) : (
                          <img
                            src={item.img}
                            alt={item.title}
                            className="ig-reel-poster"
                            loading="lazy"
                          />
                        )}

                        {/* Top Ambient Badges */}
                        <div className="ig-reel-top-bar">
                          <span className="ig-reel-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="3" y="3" width="18" height="18" rx="4" />
                              <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" />
                            </svg>
                            {item.category === 'UGC' ? 'UGC' : 'BRAND'}
                          </span>
                          {item.views && (
                            <span className="ig-reel-views">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              {item.views}
                            </span>
                          )}
                        </div>

                        {/* Play Action Overlay Button */}
                        <div className="ig-reel-play-indicator">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 3 20 12 6 21 6 3" />
                          </svg>
                        </div>



                        {/* Bottom Reel Caption & Audio Overlay */}
                        <div className="ig-reel-bottom-info">
                          <div className="ig-reel-author-row">
                            <div className="ig-author-avatar-sm">TV</div>
                            <span className="ig-author-name">@{item.author.handle}</span>
                            <span className="ig-verified-badge" title="Verified Creator">✓</span>
                          </div>
                          <p className="ig-reel-caption-preview">{item.title}</p>
                          {item.audio && (
                            <div className="ig-reel-audio-tag">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                              </svg>
                              <span>{item.audio}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              }

              /* ── INSTAGRAM POST CARD (Photos / 4:5) ── */
              return (
                <FadeIn
                  direction="up"
                  delay={0.1 + (idx % 3) * 0.12}
                  key={item.id}
                  className="portfolio-grid-item post-item"
                >
                  <div className="ig-post-card" onClick={() => setActiveModalItem(item)}>
                    {/* Post Header */}
                    <div className="ig-post-header">
                      <div className="ig-post-user-info">
                        <div className="ig-post-avatar">TV</div>
                        <div className="ig-post-user-meta">
                          <div className="ig-user-name-row">
                            <span className="ig-username">{item.author.handle}</span>
                            <span className="ig-verified-badge" title="Verified">✓</span>
                          </div>
                          {item.location && <span className="ig-location">{item.location}</span>}
                        </div>
                      </div>
                      <div className="ig-post-more">•••</div>
                    </div>

                    {/* Post Image Container */}
                    <div className="ig-post-media-box">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="ig-post-img"
                        loading="lazy"
                      />
                      <div className="ig-post-category-tag">{item.category}</div>
                    </div>

                    {/* Action Bar (Heart, Comment, Share, Save) */}
                    <div className="ig-post-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="ig-actions-left">
                        <button
                          className={`ig-btn-icon ${isLiked ? 'liked' : ''}`}
                          onClick={(e) => handleToggleLike(e, item.id)}
                          aria-label="Like post"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? '#ef233c' : 'none'} stroke={isLiked ? '#ef233c' : '#03045e'} strokeWidth="2">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </button>
                        <button
                          className="ig-btn-icon"
                          onClick={() => setActiveModalItem(item)}
                          aria-label="Comment"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#03045e" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                        <button
                          className="ig-btn-icon"
                          onClick={() => setActiveModalItem(item)}
                          aria-label="Share"
                        >
                          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#03045e" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>

                      <div className="ig-actions-right">
                        <button className="ig-btn-icon" aria-label="Bookmark">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#03045e" strokeWidth="2">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Likes & Caption */}
                    <div className="ig-post-details">
                      <p className="ig-likes-count">
                        Liked by <strong>kesvik_stories</strong> and <strong>{isLiked ? '8,493' : item.likes} others</strong>
                      </p>
                      <p className="ig-post-caption">
                        <strong>{item.author.handle}</strong> {item.caption}
                      </p>
                      <p className="ig-comments-prompt">View all {item.comments} comments</p>
                      <span className="ig-post-date">{item.date}</span>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* See All Reels Toggle (When more than 6 reels exist) */}
          {hasMoreReels && (
            <div className="portfolio-see-all-wrapper">
              <button
                id="see-all-reels-btn"
                className="portfolio-see-all-btn"
                onClick={handleToggleShowAll}
                aria-expanded={showAllReels}
              >
                <span>{showAllReels ? 'Show Less' : `See All Reels (${filteredItems.length})`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: showAllReels ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Masterpiece Post Showcase Section (Screenshot Deck Fan Design) ── */}
      <section className="portfolio-masterpiece-section">
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <FadeIn direction="up" delay={0.1} className="masterpiece-header">
            <div className="masterpiece-pill-badge">
              <span className="masterpiece-pill-dot" />
              <span>Curated Posts • Visual Identities</span>
            </div>
            <h2 className="masterpiece-heading">
              <span className="masterpiece-heading-line">Social Posts & Brand Creatives</span>
              <span className="masterpiece-heading-line">
                Crafted To <span className="text-gradient">Stop The Scroll.</span>
              </span>
            </h2>
          </FadeIn>

          {/* Fanned Out Overlapping Cards Deck */}
          <div className="masterpiece-deck-container">
            <div className="masterpiece-cards-wrapper">
              {MASTERPIECE_POSTS.map((post, idx) => {
                const rotation = post.rotation;
                const offsetY = post.offsetY || 0;

                return (
                  <div
                    key={post.id}
                    className={`masterpiece-card-item card-pos-${idx}`}
                    style={{
                      '--card-rot': `${rotation}deg`,
                      '--card-offset-y': `${offsetY}px`,
                      zIndex: idx + 1,
                    } as React.CSSProperties}
                    onClick={() => {
                      setActiveModalItem({
                        id: post.id,
                        type: 'post',
                        title: post.title,
                        caption: post.caption,
                        category: post.category,
                        likes: post.likes,
                        comments: post.comments,
                        shares: post.shares,
                        img: post.img,
                        date: 'FEATURED MASTERPIECE',
                        author: {
                          name: post.authorTag || 'Triverse Vision',
                          handle: (post.authorTag || 'triversevision').replace('@', ''),
                          avatar: '/assets/triverse_vision_logo.png',
                          verified: true,
                        },
                        aspectRatio: '4:5',
                      });
                    }}
                  >
                    {/* Floating Speech Bubble Tag (@coplin or @andrea) */}
                    {post.authorTag && (
                      <div
                        className="masterpiece-speech-tag"
                        style={{
                          backgroundColor: post.tagColor || '#2563eb',
                          '--bubble-color': post.tagColor || '#2563eb',
                        } as React.CSSProperties}
                      >
                        {post.authorTag}
                      </div>
                    )}

                    {/* Card Inner View */}
                    <div className="masterpiece-card-inner">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="masterpiece-card-img"
                        loading="lazy"
                      />
                      <div className="masterpiece-card-overlay">
                        <span className="masterpiece-card-badge">{post.category}</span>
                        <h4 className="masterpiece-card-name">{post.title}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtitle Under Cards */}
          <FadeIn direction="up" delay={0.2} className="masterpiece-footer">
            <p className="masterpiece-subtext">
              High-converting carousel graphics, editorial feed posts, and bespoke visual identity systems crafted to build founder authority and turn scrollers into brand advocates.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. Fullscreen Interactive Modal / Lightbox ─── */}
      {activeModalItem && (
        <div className="portfolio-modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-body-split">
              {/* Left Media View */}
              <div className="modal-media-col">
                {activeModalItem.type === 'reel' && activeModalItem.video ? (
                  <video
                    src={activeModalItem.video}
                    controls
                    autoPlay
                    playsInline
                    className="modal-video-element"
                  />
                ) : (
                  <img
                    src={activeModalItem.img}
                    alt={activeModalItem.title}
                    className="modal-img-element"
                  />
                )}
              </div>

              {/* Right Instagram Details View */}
              <div className="modal-info-col">
                <div className="modal-author-header">
                  <div className="ig-post-avatar">TV</div>
                  <div>
                    <div className="ig-user-name-row">
                      <span className="ig-username">{activeModalItem.author.handle}</span>
                      <span className="ig-verified-badge">✓</span>
                    </div>
                    {activeModalItem.location && (
                      <span className="ig-location">{activeModalItem.location}</span>
                    )}
                  </div>
                </div>

                <div className="modal-caption-area">
                  <p>
                    <strong>{activeModalItem.author.handle}</strong> {activeModalItem.caption}
                  </p>
                  <div className="modal-stats-pills">
                    <span className="modal-stat-pill">❤️ {activeModalItem.likes} Likes</span>
                    <span className="modal-stat-pill">💬 {activeModalItem.comments} Comments</span>
                    <span className="modal-stat-pill">↗️ {activeModalItem.shares} Shares</span>
                    {activeModalItem.views && (
                      <span className="modal-stat-pill">👁 {activeModalItem.views} Plays</span>
                    )}
                  </div>
                </div>

                <div className="modal-cta-box">
                  <p className="modal-cta-text">Want viral content engineered for your personal brand?</p>
                  <Link
                    href="/#contact"
                    className="modal-cta-button"
                    onClick={() => setActiveModalItem(null)}
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. Closing CTA Section ────────────────────── */}
      <section className="portfolio-cta-section">
        <div className="container">
          <FadeIn direction="up" delay={0.15} className="portfolio-cta-card">
            <h2 className="portfolio-cta-heading">
              Ready To Scale Your Personal Brand With Content Like This?
            </h2>
            <p className="portfolio-cta-subtext">
              We handle the entire creative lifecycle: from research-backed hooks and cinema-grade shoots to algorithm-optimized post production.
            </p>
            <div className="portfolio-cta-btn-row">
              <Link href="/#contact" className="portfolio-btn-primary">
                Book a Strategy Call
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/#packages" className="portfolio-btn-secondary">
                View Service Packages
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. Scoped Styles for Clean White Portfolio ─── */}
      <style>{`
        .portfolio-page-wrapper {
          background-color: #ffffff;
          color: #03045e;
          min-height: 100vh;
          overflow-x: hidden;
          padding-top: 130px;
          padding-bottom: 80px;
        }

        /* ── Hero ─────────────────────────────────── */
        .portfolio-hero {
          padding: 30px 0 40px;
        }

        .portfolio-hero-content {
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }

        .portfolio-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 20px;
          border-radius: 9999px;
          background: rgba(0, 119, 182, 0.08);
          border: 1px solid rgba(0, 119, 182, 0.2);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #023e8a;
          text-transform: uppercase;
          margin-bottom: 22px;
        }

        .portfolio-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #0077b6;
        }

        .portfolio-title {
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.15;
          color: #03045e;
          margin-bottom: 18px;
        }

        .portfolio-sub {
          font-size: 1.12rem;
          color: #5a738e;
          line-height: 1.7;
          max-width: 880px;
          margin: 0 auto 28px;
        }

        .portfolio-metrics-bar {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 10px 24px;
          border-radius: 999px;
          background: #f7fbff;
          border: 1px solid rgba(0, 119, 182, 0.15);
          box-shadow: 0 4px 20px rgba(2, 62, 138, 0.04);
          font-size: 0.9rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .metric-pill strong {
          color: #023e8a;
          font-weight: 700;
          margin-right: 5px;
        }

        .metric-pill span {
          color: #5a738e;
        }

        .metric-sep {
          color: rgba(0, 119, 182, 0.3);
        }

        /* ── Filter Tabs ──────────────────────────── */
        .portfolio-filter-container {
          margin-top: 45px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .portfolio-type-tabs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px;
          border-radius: 999px;
          background: #f0f7fc;
          border: 1px solid rgba(0, 119, 182, 0.16);
        }

        .type-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #5a738e;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .type-tab.active {
          background: #ffffff;
          color: #023e8a;
          box-shadow: 0 4px 16px rgba(2, 62, 138, 0.1);
        }

        .tab-count {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        /* ── Feed Grid ────────────────────────────── */
        .portfolio-grid-section {
          padding: 30px 0 24px;
        }

        .portfolio-feed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: start;
        }

        /* ── 1. INSTAGRAM REEL CARD ──────────────── */
        .ig-reel-card {
          border-radius: 28px;
          overflow: hidden;
          background: #03045e;
          position: relative;
          aspect-ratio: 9 / 16;
          box-shadow: 0 16px 40px rgba(2, 62, 138, 0.14);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.35s ease;
          border: 1px solid rgba(0, 119, 182, 0.2);
        }

        .ig-reel-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 50px rgba(0, 119, 182, 0.25);
        }

        .ig-reel-media {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .ig-reel-poster,
        .ig-reel-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Ambient overlays */
        .ig-reel-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }

        .ig-reel-top-bar {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
        }

        .ig-reel-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ffffff;
        }

        .ig-reel-views {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
        }

        .ig-reel-play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .ig-reel-card:hover .ig-reel-play-indicator {
          transform: translate(-50%, -50%) scale(1.12);
          background: rgba(255, 255, 255, 0.4);
        }

        /* Action Rail */
        .ig-reel-action-rail {
          position: absolute;
          right: 14px;
          bottom: 75px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          z-index: 2;
        }

        .ig-action-btn {
          background: transparent;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .ig-action-btn:hover {
          transform: scale(1.15);
        }

        .ig-action-btn.liked svg {
          animation: popHeart 0.3s ease;
        }

        @keyframes popHeart {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }

        /* Bottom info */
        .ig-reel-bottom-info {
          position: absolute;
          left: 16px;
          right: 65px;
          bottom: 16px;
          z-index: 2;
          color: #ffffff;
        }

        .ig-reel-author-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .ig-author-avatar-sm {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0077b6;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ffffff;
        }

        .ig-author-name {
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
        }

        .ig-verified-badge {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #0096c7;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
        }

        .ig-reel-caption-preview {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ig-reel-audio-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* ── 2. INSTAGRAM POST CARD ──────────────── */
        .ig-post-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0, 119, 182, 0.15);
          box-shadow: 0 10px 32px rgba(2, 62, 138, 0.05);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.35s ease;
        }

        .ig-post-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 45px rgba(0, 119, 182, 0.12);
          border-color: rgba(0, 119, 182, 0.28);
        }

        .ig-post-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
        }

        .ig-post-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ig-post-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #023e8a, #0096c7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 11px;
          box-shadow: 0 2px 8px rgba(0, 119, 182, 0.2);
        }

        .ig-user-name-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ig-username {
          font-size: 13px;
          font-weight: 700;
          color: #03045e;
        }

        .ig-location {
          font-size: 11px;
          color: #8eafc0;
          display: block;
        }

        .ig-post-more {
          color: #8eafc0;
          font-size: 14px;
          letter-spacing: 1px;
        }

        .ig-post-media-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #ffffff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ig-post-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .ig-post-category-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(3, 4, 94, 0.7);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .ig-post-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px 6px;
        }

        .ig-actions-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ig-btn-icon {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: transform 0.15s ease;
        }

        .ig-btn-icon:hover {
          transform: scale(1.15);
        }

        .ig-post-details {
          padding: 0 16px 16px;
        }

        .ig-likes-count {
          font-size: 12px;
          color: #03045e;
          margin-bottom: 6px;
        }

        .ig-likes-count strong {
          font-weight: 700;
        }

        .ig-post-caption {
          font-size: 13px;
          color: #2d4a5c;
          line-height: 1.5;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ig-post-caption strong {
          color: #03045e;
          font-weight: 700;
          margin-right: 5px;
        }

        .ig-comments-prompt {
          font-size: 12px;
          color: #8eafc0;
          margin-bottom: 4px;
        }

        .ig-post-date {
          font-size: 10px;
          font-weight: 600;
          color: #b0c9d7;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Lightbox Modal ───────────────────────── */
        .portfolio-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 4, 94, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .portfolio-modal-content {
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          width: 100%;
          max-width: 960px;
          max-height: 90vh;
          position: relative;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
          animation: modalScaleUp 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }

        @keyframes modalScaleUp {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }

        .modal-close-btn {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.85);
        }

        .modal-body-split {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          height: 80vh;
          max-height: 700px;
        }

        .modal-media-col {
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .modal-video-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .modal-img-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #0b1329;
        }

        .modal-info-col {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #ffffff;
          overflow-y: auto;
        }

        .modal-author-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(0, 119, 182, 0.12);
        }

        .modal-caption-area {
          flex: 1;
          padding: 20px 0;
          font-size: 14px;
          line-height: 1.7;
          color: #2d4a5c;
        }

        .modal-caption-area strong {
          color: #03045e;
        }

        .modal-stats-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .modal-stat-pill {
          padding: 6px 14px;
          border-radius: 999px;
          background: #f0f7fc;
          border: 1px solid rgba(0, 119, 182, 0.14);
          font-size: 12px;
          font-weight: 600;
          color: #023e8a;
        }

        .modal-cta-box {
          padding-top: 20px;
          border-top: 1px solid rgba(0, 119, 182, 0.12);
        }

        .modal-cta-text {
          font-size: 13px;
          color: #5a738e;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .modal-cta-button {
          display: block;
          text-align: center;
          padding: 12px 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, #023e8a, #0077b6);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .modal-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 119, 182, 0.3);
        }

        /* ── Closing CTA ──────────────────────────── */
        .portfolio-cta-section {
          padding: 50px 0 20px;
        }

        .portfolio-cta-card {
          background: linear-gradient(135deg, #03045e 0%, #023e8a 55%, #0077b6 100%);
          border-radius: 32px;
          padding: 60px 48px;
          text-align: center;
          color: #ffffff;
          box-shadow: 0 20px 60px rgba(2, 62, 138, 0.22);
        }

        .portfolio-cta-heading {
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.7rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .portfolio-cta-subtext {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.82);
          max-width: 640px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }

        .portfolio-cta-btn-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .portfolio-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 9999px;
          background: #ffffff;
          color: #03045e;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.3s ease, background 0.3s ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .portfolio-btn-primary:hover {
          transform: translateY(-2px);
          background: #caf0f8;
        }

        .portfolio-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .portfolio-btn-secondary:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.22);
        }

        /* ── See All Reels Button ─────────────────── */
        .portfolio-see-all-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }

        .portfolio-see-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          border-radius: 9999px;
          background: #ffffff;
          color: #0077b6;
          border: 1.5px solid rgba(0, 119, 182, 0.25);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 119, 182, 0.08);
        }

        .portfolio-see-all-btn:hover {
          background: #0077b6;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 119, 182, 0.25);
        }

        /* ── Masterpiece Posts Section (Tight & Cohesive Spacing) ── */
        .portfolio-masterpiece-section {
          padding: 40px 0 70px;
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
        }

        .masterpiece-header {
          text-align: center;
          max-width: 1080px;
          margin: 0 auto 12px;
        }

        .masterpiece-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 9999px;
          background: rgba(0, 119, 182, 0.07);
          border: 1px solid rgba(0, 119, 182, 0.18);
          color: #0077b6;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
          box-shadow: 0 2px 10px rgba(0, 119, 182, 0.06);
        }

        .masterpiece-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00b4d8;
          box-shadow: 0 0 8px #00b4d8;
          animation: pulseDot 2s infinite;
        }

        .masterpiece-heading {
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-size: clamp(1.85rem, 3.4vw, 3.1rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #03045e;
          line-height: 1.12;
          margin: 0 auto;
          max-width: 1080px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .masterpiece-heading .text-gradient {
          background: linear-gradient(135deg, #0077b6 0%, #0096c7 50%, #48cae4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .masterpiece-heading-line {
          display: block;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .masterpiece-heading {
            font-size: clamp(1.6rem, 5.5vw, 2.2rem);
            gap: 4px;
            line-height: 1.2;
          }
          .masterpiece-heading-line {
            white-space: normal;
          }
        }

        .masterpiece-deck-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 44px 16px 36px;
          overflow: visible;
        }

        .masterpiece-cards-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 440px;
        }

        .masterpiece-card-item {
          position: relative;
          width: clamp(160px, 14vw, 235px);
          aspect-ratio: 4 / 5;
          margin: 0 -24px;
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.45s ease, z-index 0.1s;
          transform: rotate(var(--card-rot)) translateY(var(--card-offset-y));
          transform-origin: center bottom;
        }

        .masterpiece-card-item:hover {
          z-index: 50 !important;
          transform: translateY(-28px) scale(1.12) rotate(0deg) !important;
        }

        .masterpiece-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: #f8fafc;
          border: 3px solid #ffffff;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14), 0 2px 10px rgba(0, 0, 0, 0.06);
          transition: all 0.4s ease;
        }

        .masterpiece-card-item:hover .masterpiece-card-inner {
          border-color: #000000;
          box-shadow: 0 32px 68px rgba(0, 0, 0, 0.55), 0 14px 28px rgba(0, 0, 0, 0.35);
        }

        .masterpiece-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .masterpiece-card-item:hover .masterpiece-card-img {
          transform: scale(1.06);
        }

        .masterpiece-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.38) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .masterpiece-card-item:hover .masterpiece-card-overlay {
          opacity: 1;
        }

        .masterpiece-card-badge {
          display: inline-block;
          align-self: flex-start;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          color: #ffffff;
          margin-bottom: 6px;
        }

        .masterpiece-card-name {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
          font-family: var(--font-head), 'Poppins', sans-serif;
        }

        /* Floating speech bubbles like @coplin and @andrea from screenshot */
        .masterpiece-speech-tag {
          position: absolute;
          top: -52px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
          z-index: 30;
          pointer-events: none;
          letter-spacing: -0.01em;
          animation: bubbleBob 3.5s ease-in-out infinite alternate;
        }

        .masterpiece-speech-tag::after {
          content: '';
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 7px solid var(--bubble-color, #2563eb);
        }

        @keyframes bubbleBob {
          0% {
            transform: translateX(-50%) translateY(0);
          }
          100% {
            transform: translateX(-50%) translateY(-6px);
          }
        }

        .masterpiece-footer {
          text-align: center;
          max-width: 760px;
          margin: 24px auto 0;
        }

        .masterpiece-subtext {
          font-size: clamp(1rem, 1.35vw, 1.15rem);
          color: #64748b;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 900px) {
          .masterpiece-deck-container {
            overflow-x: auto;
            justify-content: flex-start;
            padding: 70px 24px 30px;
            scrollbar-width: none;
          }
          .masterpiece-deck-container::-webkit-scrollbar {
            display: none;
          }
          .masterpiece-cards-wrapper {
            margin: 0 auto;
            min-height: 360px;
          }
          .masterpiece-card-item {
            width: 175px;
            margin: 0 -16px;
          }
        }

        @media (max-width: 600px) {
          .masterpiece-card-item {
            width: 145px;
            margin: 0 -12px;
          }
          .masterpiece-card-inner {
            border-radius: 20px;
          }
        }

        /* ── Responsive Queries ───────────────────── */
        @media (max-width: 1024px) {
          .portfolio-feed-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .modal-body-split {
            grid-template-columns: 1fr;
            height: auto;
            max-height: 80vh;
          }
          .modal-media-col {
            max-height: 45vh;
          }
        }

        @media (max-width: 640px) {
          .portfolio-page-wrapper {
            padding-top: 100px;
          }
          .portfolio-feed-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin: 0 auto;
          }
          .portfolio-metrics-bar {
            display: none;
          }
          .portfolio-type-tabs {
            flex-direction: column;
            width: 100%;
          }
          .type-tab {
            width: 100%;
            justify-content: center;
          }
          .portfolio-cta-card {
            padding: 40px 20px;
            border-radius: 24px;
          }
          .portfolio-cta-btn-row {
            flex-direction: column;
            width: 100%;
          }
          .portfolio-btn-primary,
          .portfolio-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}
