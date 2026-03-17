import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const blogPosts = [
  {
    slug: 'how-premium-websites-win-better-clients',
    title: 'How Premium Websites Win Better Clients',
    category: 'Web Design',
    date: 'March 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2000&auto=format&fit=crop',
    intro:
      'A premium website does far more than look polished. It influences trust, frames perception, and helps businesses attract stronger opportunities with greater consistency.',
    sections: [
      {
        heading: 'First impressions are rarely neutral',
        paragraphs: [
          'In most cases, your website becomes the first real conversation your brand has with a potential client. Long before a call is booked, before an email is sent, and before pricing is discussed, visitors are already deciding whether your business feels trustworthy, capable, and worth engaging.',
          'That decision often happens quickly. People notice the clarity of your structure, the quality of the visuals, the confidence in your copy, and the polish of the experience. Even if they cannot explain it technically, they can feel whether a website looks intentional or improvised.'
        ]
      },
      {
        heading: 'Premium is not only visual',
        paragraphs: [
          'A premium website is not simply one with nice colors or smooth animations. Premium quality is usually the result of many small choices working together: thoughtful spacing, refined typography, better hierarchy, consistent imagery, clear positioning, and an experience that feels stable and deliberate.',
          'When those details are aligned, the visitor starts to feel reassured. The website communicates that the business behind it pays attention, values quality, and is prepared to deliver at a higher standard.'
        ]
      },
      {
        heading: 'The right clients respond to the right signals',
        paragraphs: [
          'Higher-value clients often evaluate more than your service list. They look for signs of maturity, consistency, confidence, and relevance. A weak digital presence can silently reduce trust before the conversation even begins.',
          'On the other hand, when a website feels premium, it creates alignment between your positioning and your presentation. That alignment increases the quality of opportunities you attract.'
        ]
      },
      {
        heading: 'Trust is built through clarity',
        paragraphs: [
          'One of the most underrated traits of a premium website is clarity. Good websites guide people. They make it easy to understand who you are, what you do, who you help, and what the next step should be.',
          'Confusion creates friction. Clarity creates confidence. And confidence improves conversion.'
        ]
      },
      {
        heading: 'A website should operate like a business asset',
        paragraphs: [
          'Too many websites exist only as placeholders. They look acceptable but do not actively support the business. A stronger website should qualify leads, support your authority, and reinforce your value before the first meeting happens.',
          'That is the difference between simply being online and actually using your online presence strategically.'
        ]
      },
      {
        heading: 'Why this matters for Timigaga Studios clients',
        paragraphs: [
          'At Timigaga Studios, the goal is not just to produce websites that look modern. The goal is to build digital experiences that elevate perception, support business growth, and position brands more credibly in competitive markets.',
          'That is why premium web design remains one of the most practical investments a modern business can make.'
        ]
      }
    ]
  },
  {
    slug: 'why-brand-identity-still-matters-in-the-ai-era',
    title: 'Why Brand Identity Still Matters in the AI Era',
    category: 'Branding',
    date: 'March 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    intro:
      'As AI lowers the barrier to execution, strong brand identity becomes even more valuable as a differentiator.',
    sections: [
      {
        heading: 'Speed is no longer enough',
        paragraphs: [
          'AI has made ideation and execution dramatically faster. But once speed becomes widely available, the real differentiator is no longer speed itself. It becomes distinction.',
          'That means businesses need a stronger identity, not a weaker one.'
        ]
      },
      {
        heading: 'Identity creates memorability',
        paragraphs: [
          'Brand identity gives shape to how people remember you. It influences recognition, trust, and perception across every touchpoint.',
          'Without identity, many brands begin to feel interchangeable.'
        ]
      },
      {
        heading: 'Consistency is strategic',
        paragraphs: [
          'Consistency across your website, visuals, tone, and communication builds trust over time. In a noisy market, consistency is one of the clearest signals of seriousness.',
          'This is especially important when AI makes generic production easier.'
        ]
      },
      {
        heading: 'The future belongs to brands with taste',
        paragraphs: [
          'Tools can generate output, but taste still decides what is worth keeping. The businesses that combine AI efficiency with strong identity and curation will remain the most compelling.',
          'That is where branding still matters deeply.'
        ]
      }
    ]
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="bg-black text-white min-h-screen pt-32 pb-20">
        <SectionWrapper>
          <div className="max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#95EF90] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Journal
            </Link>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Article not found
            </h1>
            <p className="text-white/60 text-lg leading-8">
              The article you’re looking for does not exist or has been moved.
            </p>
          </div>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="bg-black text-white pt-28 md:pt-32 pb-24">
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#95EF90] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Journal
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#95EF90]">
                {post.category}
              </span>
              <span className="text-white/25">•</span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                {post.date}
              </span>
              <span className="text-white/25">•</span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] mb-6">
              {post.title}
            </h1>

            <p className="text-white/60 text-lg md:text-xl leading-9 max-w-3xl mb-10">
              {post.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="overflow-hidden rounded-[2rem] border border-white/6 glass-dark mb-14"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="max-w-3xl"
          >
            <div className="space-y-12">
              {post.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-5">
                    {section.heading}
                  </h2>
                  <div className="space-y-7">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-white/72 text-base md:text-lg leading-9"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.article>

          <div className="mt-16 pt-10 border-t border-white/8 max-w-3xl">
            <p className="text-white/40 uppercase tracking-[0.3em] text-xs mb-4">
              Published by
            </p>
            <h3 className="text-2xl font-semibold tracking-tight mb-3">
              Timigaga Studios
            </h3>
            <p className="text-white/60 text-base leading-8">
              Build. Design. Innovate.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BlogPost;