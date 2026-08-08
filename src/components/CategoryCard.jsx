import { motion } from 'framer-motion';
import { IconArrow } from '../assets/icons/Icons.jsx';

// Category card — hairline border, hover translate + border accent
export default function CategoryCard({ title, description, count, icon, featured = false, index = 0 }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.07, duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <motion.a
      href="#"
      id={`category-card-${index}`}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.18, ease: 'easeOut' } }}
      className={`
        group relative block
        border border-[var(--color-border)]
        hover:border-[var(--color-accent)]
        transition-colors duration-200
        p-6 md:p-8
        ${featured ? 'md:col-span-2 md:row-span-1' : ''}
        cursor-pointer
        overflow-hidden
      `}
    >
      {/* Icon / number */}
      <div className="flex items-start justify-between mb-auto">
        <div
          className="w-10 h-10 border border-[var(--color-border)] group-hover:border-[var(--color-accent)] flex items-center justify-center text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-all duration-200"
        >
          {icon}
        </div>
        {count && (
          <span className="text-xs text-[var(--color-ink-faint)] tracking-wide">{count} courses</span>
        )}
      </div>

      <div className={`${featured ? 'mt-8 md:mt-12' : 'mt-6'}`}>
        <h3
          className={`font-serif font-medium text-[var(--color-ink)] leading-snug mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mt-2 max-w-sm">
            {description}
          </p>
        )}
      </div>

      {/* Arrow - appears on hover */}
      <div className="mt-6 flex items-center gap-2 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs font-medium tracking-wide">Explore</span>
        <IconArrow size={14} />
      </div>

      {/* Accent corner on featured */}
      {featured && (
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: 'var(--color-accent)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      )}
    </motion.a>
  );
}
