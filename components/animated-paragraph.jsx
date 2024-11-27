import React, { useState, useEffect, useMemo } from "react";

const AnimatedParagraph = ({
  text,
  fullStopCount = 2, // Default to breaking after 2 full stops
  delay = 2000, // Default delay of 2 seconds
  className = "text-xl text-white leading-relaxed text-focus-in",
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
    <div>
      {visibleChunks.map((chunk, index) => (
        <p key={index} className={className}>
          {chunk}
        </p>
      ))}
    </div>
  );
};

export default AnimatedParagraph;