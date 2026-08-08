import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button.jsx';
import { IconClose } from '../assets/icons/Icons.jsx';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const containerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 },
  },
  exit: {
    x: '100%',
    transition: { type: 'tween', ease: [0.7, 0, 0.84, 0], duration: 0.3 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.3, ease: 'easeOut' },
  }),
};

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  const allLinks = [
    { label: 'Home', href: '#' },
    ...navLinks.flatMap((link) =>
      link.dropdown
        ? link.dropdown.map((item) => ({ label: item, href: '#' }))
        : [{ label: link.label, href: link.href }]
    ),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-[var(--color-ink)]/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[70] w-4/5 max-w-sm bg-[var(--color-paper)] flex flex-col"
            id="mobile-menu-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-border)]">
              <span
                className="text-xl font-medium text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Striver
              </span>
              <button onClick={onClose} className="text-[var(--color-ink-muted)]" aria-label="Close menu">
                <IconClose size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-8 py-8">
              {allLinks.map((link, i) => (
                <motion.a
                  key={link.label + i}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={onClose}
                  className="block py-4 border-b border-[var(--color-border)] text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-8 py-8 border-t border-[var(--color-border)]">
              <Button
                href="mailto:enroll@striver.in"
                variant="primary"
                className="w-full justify-center"
                id="mobile-enroll-btn"
                onClick={onClose}
              >
                Enroll Now
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
