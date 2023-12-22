import React, { useState, useCallback } from 'react';

const Highlighter = ({ sentence, words, intervals, start, stop }) => {
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [timeoutIds, setTimeoutIds] = useState([]);

  // Function to start highlighting words
  const startHighlighting = useCallback(() => {
    let currentTimeoutIds = [];
    setHighlightedWord(words[0]);

    words.forEach((word, index) => {
      let timeoutId = setTimeout(() => {
        setHighlightedWord(words[index]);
        // Clear highlighting when done
        if (index === words.length - 1) {
          setTimeout(() => setHighlightedWord(null), intervals[index]);
        }
      }, intervals.slice(0, index + 1).reduce((a, b) => a + b, 0));

      currentTimeoutIds.push(timeoutId);
    });

    // Track all timeout IDs so they can be cleared if stopping early
    setTimeoutIds(currentTimeoutIds);
  }, [words, intervals]);

  const clearHighlighting = useCallback(() => {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
    setHighlightedWord(null);
  }, [timeoutIds]);

  // Handle word mouse hover
  const handleMouseEnter = (word) => {
    setHoveredWord(word);
  };

  const handleMouseLeave = () => {
    setHoveredWord(null);
  };

  // Effect for starting the highlighting process
  React.useEffect(() => {
    if (start) {
      startHighlighting();
    }
  }, [start, startHighlighting]);

  // Effect for stopping the highlighting process
  React.useEffect(() => {
    if (stop) {
      clearHighlighting();
    }
  }, [stop, clearHighlighting]);

  return (
    <div>
      {sentence.split(' ').map((word, index) => {
        const isHighlighted = word === highlightedWord || word === hoveredWord;
        const color = isHighlighted ? 'red' : 'black';
        return (
          <span
            key={index}
            style={{ color }}
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
  const words = sentence.split(' ');
  const intervals = words.map((_, i) => 1000 + i * 100); // Sample intervals
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);

  const handlePlayClick = () => {
    setStop(false);
    setStart(true);
  };

  const handleStopClick = () => {
    setStart(false);
    setStop(true);
  };

  return (
    <div>
      <Highlighter 
        sentence={sentence} 
        words={words} 
        intervals={intervals} 
        start={start} 
        stop={stop} 
      />
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
};

export default App;