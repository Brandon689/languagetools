import React, { useState, useEffect, useMemo } from 'react';

const Highlighter = ({ sentence, words, intervals }) => {
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [hoveredWord, setHoveredWord] = useState(null);

  // useMemo hook to split the sentence into words only once
  const splitSentence = useMemo(() => sentence.split(' '), [sentence]);

  useEffect(() => {
    let timer;

    if (wordIndex < words.length) {
      timer = setInterval(() => {
        setHighlightedWord(words[wordIndex]);
        setWordIndex((prevIndex) => prevIndex + 1);

        if (wordIndex === words.length - 1) {
          clearInterval(timer);
          setTimeout(() => setHighlightedWord(null), intervals[wordIndex]);
        }
      }, intervals[wordIndex]);
    }

    return () => clearInterval(timer);
  }, [wordIndex, intervals, words]);

  // Handle word mouse hover
  const handleMouseEnter = (word) => {
    setHoveredWord(word);
  };

  const handleMouseLeave = () => {
    setHoveredWord(null);
  };

  return (
    <div>
      {splitSentence.map((word, index) => {
        // Determine if the word should be highlighted
        const isHighlighted =
          word === highlightedWord || word === hoveredWord;
          
        // Change color to red if highlighted, otherwise black
        const color = isHighlighted ? 'red' : 'black';

        return (
          <span
            key={index}
            style={{ color }} // Apply the style change here
            onMouseEnter={() => handleMouseEnter(word)}
            onMouseLeave={handleMouseLeave}
          >
            {word}{' '}
          </span>
        );
      })}
    </div>
  );
};

const App = () => {
  const sentence = 'This is a sample sentence to demonstrate highlighting.';
  const words = sentence.split(' '); // This could also be memoized if necessary
  const intervals = [1000, 1500, 800, 1200, 1000, 2000, 1000, 800, 1500, 1200, 1000, 1500, 800];

  return <Highlighter sentence={sentence} words={words} intervals={intervals} />;
};

export default App;