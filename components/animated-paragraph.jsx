import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
const AnimatedParagraph = ({
  text,
  fullStopCount = 2, // Default to breaking after 2 full stops
  delay = 0, // Default delay of 2 seconds
  className,
}) => {
  const [visibleChunks, setVisibleChunks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to split text based on full stops and fullStopCount
  const splitTextByFullStops = (text, fullStopCount) => {
    const sentences = text.split("."); // Split text into sentences by "."
    const result = [];
    let temp = "";

    sentences.forEach((sentence, index) => {
      if (sentence.trim()) {
        temp += sentence + "."; // Add the sentence back with the period
        if ((index + 1) % fullStopCount === 0 || index === sentences.length - 1) {
          result.push(temp.trim());
          temp = ""; // Reset temp for the next chunk
        }
      }
    });

    return result;
  };

  const chunks = useMemo(
    () => splitTextByFullStops(text, fullStopCount),
    [text, fullStopCount]
  );

  useEffect(() => {
    if (currentIndex < chunks.length) {
      // Show the current chunk and increment the index after the delay
      const timer = setTimeout(() => {
        setVisibleChunks((prev) => [...prev, chunks[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer); // Cleanup on unmount or index change
    }
  }, [currentIndex, chunks, delay]);

  return (
    <div className="space-y-4">
      {visibleChunks.map((chunk, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${className} relative`}
        >
          <span className="relative z-10">{chunk}</span>
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.p>
      ))}
    </div>
  );
};

export default AnimatedParagraph;