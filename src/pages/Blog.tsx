import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionWrapper from '@/components/SectionWrapper';

const posts = [
  {
    id: '1',
    slug: 'how-premium-websites-win-better-clients',
    title: 'How Premium Websites Win Better Clients',
    category: 'Web Design',
    date: 'March 2026',
    readTime: '8 min read',
    excerpt:
      'A strong website is more than design. It shapes trust, communicates positioning, and attracts higher-value clients from the first impression.',
    image:
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2000&auto=format&fit=crop',
    featured: true,
  },
  {
    id: '2',
    slug: 'why-brand-identity-still-matters-in-the-ai-era',
    title: 'Why Brand Identity Still Matters in the AI Era',
    category: 'Branding',
    date: 'March 2026',
    readTime: '7 min read',
    excerpt:
      'As AI makes execution faster, brand identity becomes even more important. Distinction, clarity, and trust remain your strongest competitive assets.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    featured: false,
  },
  {
    id: '3',
    slug: 'using-ai-tools-to-build-faster-without-losing-quality',
    title: 'Using AI Tools to Build Faster Without Losing Quality',
    category: 'AI',
    date: 'March 2026',
    readTime: '6 min read',
    excerpt:
      'AI can accelerate development, content, and strategy workflows, but the real advantage comes from combining speed with taste, structure, and quality control.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    featured: false,
  },
  {
    id: '4',
    slug: 'the-modern-client-journey-for-creative-studios',
    title: 'The Modern Client Journey for Creative Studios',
    category: 'Business',
    date: 'March 2026',
    readTime: '9 min read',
    excerpt:
      'From discovery to conversion, today’s client journey is shaped by credibility, speed, clarity, and confidence across every interaction.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    featured: false,
  },
  {
    id: '5',
    slug: 'what-makes-a-portfolio-feel-premium',
    title: 'What Makes a Portfolio Feel Premium',
    category: 'Design',
    date: 'March 2026',
    readTime: '7 min read',
    excerpt:
      'Premium portfolios are built on restraint, rhythm, typography, spacing, and visual confidence. The details always shape the perception.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2000&auto=format&fit=crop',
    featured: false,
  },
  {
    id: '6',
    slug: 'systems-not-chaos-building-a-better-studio-workflow',
    title: 'Systems, Not Chaos: Building a Better Studio Workflow',
    category: 'Productivity',
    date: 'March 2026',
    readTime: '8 min read',
    excerpt:
      'Studios scale better when they move from scattered tools to structured systems for intake, delivery, communication, and follow-up.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    featured: false,
  },
];

const categories = ['All', 'Web Design', 'Branding', 'AI', 'Business', 'Design', 'Productivity'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPost = posts.find((post) => post.featured);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.featured) return false;
      if (activeCategory === 'All') return true;
      return post.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="bg-black text-white pt-28 md:pt-32 pb-20 overflow-hidden">
      <SectionWrapper>
        <div className="max-w-4xl mb-14 md:mb-16">
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs mb-5">
            Journal
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] mb-6"
          >
            Long-form insight for modern brands, creative systems, and digital growth.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-white/60 text-base md:text-lg leading-8 max-w-3xl"
          >
            Timigaga Journal is where strategy, design, systems, AI, and business thinking
            come together. It is built for founders, modern brands, and anyone interested
            in building a more premium digital presence.
          </motion.p>
        </div>

        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="group mb-16 md:mb-20 overflow-hidden rounded-[2rem] border border-white/6 glass-dark"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-[420px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[#95EF90]">
                      Featured
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                      {featuredPost.category}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                      {featuredPost.date}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
                    {featuredPost.title}
                  </h2>

                  <p className="text-white/60 text-base md:text-lg leading-8 max-w-xl">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-10">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white hover:text-[#95EF90] transition-colors"
                  >
                    Read article
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
                activeCategory === category
                  ? 'border-[#95EF90] bg-[#95EF90] text-black'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="group overflow-hidden rounded-[1.75rem] border border-white/6 glass-dark"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#95EF90]">
                      {post.category}
                    </span>
                    <span className="text-white/25">•</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {post.date}
                    </span>
                    <span className="text-white/25">•</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight leading-tight mb-4 group-hover:text-[#95EF90] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/55 text-sm leading-7 mb-6">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-[#95EF90] transition-colors"
                  >
                    Read article
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 md:mt-24 rounded-[2rem] border border-white/6 glass-dark p-8 md:p-12 text-center">
          <p className="text-white/40 uppercase tracking-[0.35em] text-xs mb-4">
            Editorial Direction
          </p>
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">
            Built to grow into a real premium journal.
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto text-base leading-8">
            This blog is structured to support long-form thought leadership,
            SEO-rich articles, strategic brand positioning, and future editorial expansion.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Blog;