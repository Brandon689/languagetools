import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Highlighter = ({ words, highlightedIndex, onWordSelect }) => {
  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            color: index === highlightedIndex ? 'red' : 'black',
            cursor: 'pointer',
          }}
          onClick={() => onWordSelect(word)}
        >
          {word}{' '}
        </span>
      ))}
    </div>
  );
};

const DisplaySelectedWord = ({ selectedWord }) => {
  if (!selectedWord) return null; // Don't display if no word is selected

  return (
    <div>
      Selected Word: <strong>{selectedWord}</strong>
    </div>
  );
};

const App = () => {
  const sentence = 'This is a sample sentence to demonstrate highlighting.';
  const words = sentence.split(' ');
  const intervals = words.map(() => 500);
  const [playing, setPlaying] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedWord, setSelectedWord] = useState('');
  const [hoveredWord, setHoveredWord] = useState(null);
  const handlePlayback = () => {
    setPlaying(true);
    let index = 0;

    const highlightNextWord = () => {
      if (index < words.length) {
        setHighlightedIndex(index);
        index++;
        setTimeout(highlightNextWord, intervals[index - 1]);
      } else {
        setHighlightedIndex(-1);
        setPlaying(false);
      }
    };

    highlightNextWord();
  };

  const handleMouseEnter = (word) => {
    setHoveredWord(word);
  };

  const handleMouseLeave = () => {
    setHoveredWord(null);
  };

  return (
    <div>
      <Highlighter
        words={words}
        highlightedIndex={highlightedIndex}
        onWordSelect={(word) => setSelectedWord(word)}
      />
      <button onClick={handlePlayback} disabled={playing}>
        {playing ? 'Playing...' : 'Play'}
      </button>
      <DisplaySelectedWord selectedWord={selectedWord} />
    </div>
  );
};



export default App;



// import React, { useState, useEffect, useCallback } from 'react';

// const Highlighter = ({ sentence, words, intervals, playing, onFinish, onSelectWord }) => {
//   const [highlightedWord, setHighlightedWord] = useState(null);
//   const [hoveredWord, setHoveredWord] = useState(null);

//   const startHighlighting = useCallback(() => {
//     let index = 0;
//     const advanceHighlighting = () => {
//       if (index < words.length) {
//         setHighlightedWord(words[index]);
//         console.log(index);
//         index++;
//       } else {
//         setHighlightedWord(null); 
//         onFinish();
//         return;
//       }
//       setTimeout(advanceHighlighting, intervals[index - 1]);
//     };
//     advanceHighlighting();
//   }, [words, intervals, onFinish]);

//   useEffect(() => {
//     if (playing) {
//       startHighlighting();
//     }
//   }, [playing, startHighlighting]);

//   const handleMouseEnter = (word) => {
//     setHoveredWord(word);
//   };

//   const handleMouseLeave = () => {
//     setHoveredWord(null);
//   };

//   const handleWordClick = (word) => {
//     onSelectWord(word);
//   };

//   return (
//     <div>
//       {sentence.split(' ').map((word, index) => {
//         const isHighlighted = word === highlightedWord || word === hoveredWord;
//         const color = isHighlighted ? 'red' : 'black';
//         return (
//           <span
//             key={index}
//             style={{ color, cursor: 'pointer', userSelect: 'none' }}  // Added userSelect for better UX
//             onClick={() => handleWordClick(word)}
//             onMouseEnter={() => handleMouseEnter(word)}
//             onMouseLeave={handleMouseLeave}
//           >
//             {word + ' '}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// const DisplaySelectedWord = ({ selectedWord }) => {
//   if (!selectedWord) return null; // Don't display if no word is selected

//   return (
//     <div>
//       Selected Word: <strong>{selectedWord}</strong>
//     </div>
//   );
// };

// const App = () => {
//   const sentence = 'This is a sample sentence to demonstrate highlighting.';
//   const words = sentence.split(' ');
//   const intervals = words.map(() => 500);
//   const [playing, setPlaying] = useState(false);
//   const [selectedWord, setSelectedWord] = useState('');

//   const handlePlayClick = () => {
//     setPlaying(true);
//   };

//   const handlePlaybackFinish = () => {
//     setPlaying(false);
//   };

//   const handleWordSelection = (word) => {
//     setSelectedWord(word);
//   };
//   const forceRerender = () => {
//     // Call forceUpdate to force a re-render
//     forceUpdate();
//   };
//   return (
//     <div>
//       <Highlighter 
//         sentence={sentence} 
//         words={words} 
//         intervals={intervals} 
//         playing={playing} 
//         onFinish={handlePlaybackFinish}
//         onSelectWord={handleWordSelection}
//       />
//       <button onClick={handlePlayClick} disabled={playing}>
//         {playing ? 'Playing...' : 'Play'}
//       </button>
//       <DisplaySelectedWord selectedWord={selectedWord} />

//       <button onClick={forceRerender}>Force Re-render</button>
//     </div>
//   );
// };

// export default App;