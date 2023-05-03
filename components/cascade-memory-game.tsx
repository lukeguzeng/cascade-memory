import { shuffle } from '@/composables/shuffle';
import { translate } from '@/composables/translate';
import {
  getShuffledEnglishWords,
  getShuffledFrenchWords,
} from '@/composables/word';
import {
  EnglishWord,
  FrenchWord,
  GameState,
  InitailScore,
} from '@/constants/constants';
import { useState } from 'react';

export function CascadeMemoryGame({ ...props }) {
  const [gameState, setGameState] = useState(GameState.Ready);
  const [score, setScore] = useState(InitailScore);

  const [englishWords, setEnglishWords] = useState([]);
  const [frenchWords, setFrenchWords] = useState([]);

  const [selectedEnglishWord, setSelectedEnglishWord] = useState<
    string | undefined
  >(undefined);

  const buttonText = (): string => {
    if (gameState === GameState.InGame) {
      return 'Grade';
    }
    return 'Go';
  };

  const buttonAction = () => {
    if (gameState === GameState.InGame) {
      setScore(50);
      setGameState(GameState.Ready);
    } else {
      setScore(-1);
      setEnglishWords(getShuffledEnglishWords());
      setGameState(GameState.InGame);
    }
  };

  const DisplayedScore = () => {
    if (score === InitailScore || gameState === GameState.InGame) return;
    return <div>{score}</div>;
  };

  const EnlishWordList = () => {
    return englishWords.map((word: string) => {
      return (
        <div
          key={word}
          onMouseDown={() => setSelectedEnglishWord(word)}
          onMouseUp={() => setSelectedEnglishWord(undefined)}
        >
          {' '}
          {word}
        </div>
      );
    });
  };

  return (
    <>
      <div>Cascade Memory Game {selectedEnglishWord}</div>
      {DisplayedScore()}
      <div onClick={() => buttonAction()}>{buttonText()}</div>
      {EnlishWordList()}
      {EnlishWordList()}
    </>
  );
}
