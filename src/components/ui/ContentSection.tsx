import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ContentSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ContentSection({ children, delay = 0, className = '' }: ContentSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 