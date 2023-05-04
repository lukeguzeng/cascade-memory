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

interface MatchedWord {
  englishWord: string;
  frenchWord: string;
}

export function CascadeMemoryGame({ ...props }) {
  const [gameState, setGameState] = useState(GameState.Ready);
  const [score, setScore] = useState(InitailScore);

  const [englishWords, setEnglishWords] = useState([]);
  const [frenchWords, setFrenchWords] = useState([]);
  const [matchedWords, setMatchedWords] = useState<MatchedWord[]>([]);

  const [selectedEnglishWord, setSelectedEnglishWord] = useState<
    string | undefined
  >(undefined);

  const buttonText = (): string => {
    if (gameState === GameState.InGame) return 'Grade';
    if (score != -1) return 'Go Again';
    return 'Go';
  };

  const gradeGame = (matchedWords: MatchedWord[]): number => {
    return matchedWords.reduce((score, currentValue) => {
      if (translate(currentValue.englishWord) == currentValue.frenchWord) {
        return score + 10;
      }
      return score;
    }, 0);
  };

  const buttonAction = () => {
    if (gameState === GameState.InGame) {
      setScore(gradeGame(matchedWords));
      setGameState(GameState.Ready);
    } else {
      startNewGame();
    }
  };

  const startNewGame = () => {
    setEnglishWords(getShuffledEnglishWords());
    setFrenchWords(getShuffledFrenchWords());

    setMatchedWords([]);
    setScore(-1);

    setGameState(GameState.InGame);
  };

  const displayedScore = () => {
    if (score === InitailScore || gameState === GameState.InGame) return;
    return <div>{score}</div>;
  };

  const EnlishWordList = () => {
    if (englishWords.length == 0) return;

    const tmp = englishWords.map((word: string) => {
      return (
        <div
          key={word}
          onMouseDown={(event) => onEnglishWordMouseDown(event, word)}
          className="select-none"
        >
          {word}
        </div>
      );
    });
    return (
      <div>
        <div>English Words</div>
        {tmp}
      </div>
    );
  };

  const onEnglishWordMouseDown = (event: any, word: string) => {
    setMatchedWords(
      matchedWords.filter((x: MatchedWord) => x.englishWord != word)
    );
    setSelectedEnglishWord(word);
  };

  const matchedWordList = () => {
    return matchedWords.map((matchWord: MatchedWord) => {
      return (
        <div key={matchWord.englishWord}>
          {matchWord.englishWord} , {matchWord.frenchWord}
        </div>
      );
    });
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
  };

  const FrenchWordList = () => {
    return frenchWords.map((word: string) => {
      return (
        <div key={word} onMouseUp={() => onFrenchWordMouseUp(word)}>
          {word}
        </div>
      );
    });
  };

  const MatchLinks = () => {
    return <div></div>;
  };

  return (
    <>
      <div>Cascade Memory Game</div>
      <div onClick={() => buttonAction()}>{buttonText()}</div>
      {displayedScore()}
      {matchedWordList()}
      <div className="flex">
        <div className="w-40">{EnlishWordList()}</div>
        <div className="w-40">{MatchLinks()}</div>
        <div className="w-40">{FrenchWordList()}</div>
      </div>
    </>
  );
}
