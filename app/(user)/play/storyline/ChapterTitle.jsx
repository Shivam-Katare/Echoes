import { motion } from 'framer-motion';
import React from 'react';
import { poppins } from './StoryChunk';
import { merienda, playfair } from '../../layout';

function ChapterTitleComponent({ chapterId, title, onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 5000);
      }}
    >
      <div className="text-center">
        <motion.h2
          className={`${merienda.className} text-[35px] text-white mb-4`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Chapter {chapterId}
        </motion.h2>
        <motion.h1
          className={`${playfair.className} text-[35px] font-bold text-white`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h1>
      </div>
    </motion.div>
  );
}

export const ChapterTitle = React.memo(ChapterTitleComponent);