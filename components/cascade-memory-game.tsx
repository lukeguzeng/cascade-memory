import { grade } from '@/composables/grade';
import {
  getShuffledEnglishWords,
  getShuffledFrenchWords,
} from '@/composables/word';
import { GameState, InitailScore } from '@/constants/constants';
import { MatchedWord } from '@/type';
import { useState } from 'react';

export function CascadeMemoryGame({ ...props }) {
  const [gameState, setGameState] = useState(GameState.Ready);
  const [score, setScore] = useState(InitailScore);

  const [englishWords, setEnglishWords] = useState([]);
  const [frenchWords, setFrenchWords] = useState([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWord[]>([]);

  const [selectedEnglishWord, setSelectedEnglishWord] = useState<
    string | undefined
  >(undefined);

  const startNewGame = () => {
    setEnglishWords(getShuffledEnglishWords());
    setFrenchWords(getShuffledFrenchWords());

    setMatchedWords([]);
    setScore(InitailScore);

    setGameState(GameState.InGame);
  };

  const displayedScore = () => {
    if (score === InitailScore || gameState === GameState.InGame) return;
    return <div>{score}</div>;
  };

  const EnlishWordList = () => {
    let rowCount: number = 1;
    return englishWords.map((word: string) => {
      let bgColor = rowCount % 2 == 1 ? 'bg-cyan-600' : 'bg-cyan-500';
      if (selectedEnglishWord == word) bgColor = 'bg-cyan-900';
      rowCount = rowCount + 1;

      return (
        <div
          key={word}
          onMouseDown={(event) => onEnglishWordMouseDown(event, word)}
          className={`select-none text-center ${bgColor}`}
        >
          {word}
        </div>
      );
    });
  };

  const FrenchWordList = () => {
    let rowCount: number = 1;

    return frenchWords.map((word: string) => {
      const bgColor = rowCount % 2 == 1 ? 'bg-lime-600' : 'bg-lime-500';
      rowCount = rowCount + 1;

      return (
        <div
          className={`text-center ${bgColor}`}
          key={word}
          onMouseUp={() => onFrenchWordMouseUp(word)}
        >
          {word}
        </div>
      );
    });
  };

  // actions
  const onEnglishWordMouseDown = (event: any, word: string) => {
    setMatchedWords(
      matchedWords.filter((x: MatchedWord) => x.englishWord != word)
    );
    setSelectedEnglishWord(word);
  };

  const onFrenchWordMouseUp = (word: string) => {
    if (!selectedEnglishWord) return;

    setMatchedWords([
      ...matchedWords.filter((x: MatchedWord) => x.frenchWord != word),
      {
        englishWord: selectedEnglishWord,
        frenchWord: word,
      },
    ]);
    setSelectedEnglishWord(undefined);
  };

  const onButtonClick = () => {
    if (gameState === GameState.InGame) {
      setScore(grade(matchedWords));
      setGameState(GameState.Ready);
    } else {
      startNewGame();
    }
  };

  const buttonText = (): string => {
    if (gameState === GameState.InGame) return 'Grade';
    if (score != InitailScore) return 'Go Again';
    return 'Go';
  };

  return (
    <>
      <div>Cascade Memory Game</div>
      <button
        onClick={() => onButtonClick()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {buttonText()}
      </button>
      {displayedScore()}
      <div className="flex">
        <div className="w-40">
          <div className="bg-cyan-800 text-center">English Words</div>
          {EnlishWordList()}
        </div>
        <div className="w-80">
          {matchedWords.map((matchWord: MatchedWord) => {
            return (
              <div key={matchWord.englishWord} className="text-center">
                {matchWord.englishWord} , {matchWord.frenchWord}
              </div>
            );
          })}
        </div>
        <div className="w-40">
          <div className="bg-lime-800 text-center">French Words</div>
          {FrenchWordList()}
        </div>
      </div>
    </>
  );
}
