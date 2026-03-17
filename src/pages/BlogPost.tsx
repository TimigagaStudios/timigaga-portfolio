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
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2000&auto=format&fit=crop',
    intro:
      'A premium website does far more than look polished. It influences trust, frames perception, and helps businesses attract stronger opportunities with greater consistency.',
    content: [
      'In today’s digital market, your website often becomes the first real interaction people have with your brand. Before any meeting, call, or proposal, people are already forming an opinion based on how your brand presents itself online.',
      'That means design is not just decoration. Structure, spacing, typography, loading experience, clarity of messaging, and interaction quality all contribute to how serious your business feels. Premium clients are often more sensitive to quality cues than people realize.',
      'A strong website communicates confidence. It tells the visitor that your business understands positioning, understands presentation, and understands what it means to build trust before asking for commitment.',
      'This is why premium websites tend to convert better clients. They create alignment between the value you claim and the experience the visitor actually feels. When there is no gap between those two, trust increases.',
      'For creative studios, consultants, agencies, and digital businesses, the website should not feel like a brochure. It should feel like a system. It should lead, qualify, reassure, and persuade with intention.',
      'At Timigaga Studios, that is the standard we aim for: websites that do not simply exist online, but actively strengthen the quality of the opportunities a business attracts.'
    ],
  },
  {
    slug: 'why-brand-identity-still-matters-in-the-ai-era',
    title: 'Why Brand Identity Still Matters in the AI Era',
    category: 'Branding',
    date: 'March 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    intro:
      'As AI makes production faster and more accessible, brand identity becomes even more important as a differentiator.',
    content: [
      'AI has made content creation, ideation, and execution dramatically faster. But when speed becomes widely available, distinction becomes more valuable.',
      'This is where brand identity matters. A good identity helps people recognize your business, understand your positioning, and remember your presence after they leave.',
      'Without a strong identity, many brands begin to feel interchangeable. In an era where outputs can be generated quickly, clarity and recognizability become strategic advantages.',
      'Brand identity is not only a logo or color set. It includes tone, structure, visual rhythm, perception, and consistency across the entire brand experience.',
      'Businesses that understand this will continue to stand out, even in increasingly automated markets.'
    ],
  },
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
            className="overflow-hidden rounded-[2rem] border border-white/6 glass-dark mb-12"
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
            <div className="space-y-8">
              {post.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-white/72 text-base md:text-lg leading-9"
                >
                  {paragraph}
                </p>
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