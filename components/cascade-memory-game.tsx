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

  const [selectedFrenchWord, setSelectedFrenchWord] = useState<
    string | undefined
  >(undefined);

  const buttonText = (): string => {
    if (gameState === GameState.InGame) {
      return 'Grade';
    }
    return 'Go';
  };

  const gradeGame = (matchedWords: MatchedWord[]): number => {
    return matchedWords.reduce((accumulator, currentValue) => {
      console.log(translate(currentValue.englishWord));
      console.log(currentValue.frenchWord);

      if (translate(currentValue.englishWord) == currentValue.frenchWord) {
        console.log('here');
        return accumulator + 10;
      }
      return accumulator;
    }, 0);
  };

  const buttonAction = () => {
    if (gameState === GameState.InGame) {
      setScore(gradeGame(matchedWords));
      setGameState(GameState.Ready);
    } else {
      resetAndStartGame();
    }
  };
  const resetAndStartGame = () => {
    setEnglishWords(getShuffledEnglishWords());
    setFrenchWords(getShuffledFrenchWords());

    setMatchedWords([]);
    setScore(-1);

    setGameState(GameState.InGame);
  };

  const DisplayedScore = () => {
    if (score === InitailScore || gameState === GameState.InGame) return;
    return <div>{score}</div>;
  };

  const EnlishWordList = () => {
    return englishWords.map((word: string) => {
      return (
        <div key={word} onMouseDown={() => onEnglishWordMouseDown(word)}>
          {word}
        </div>
      );
    });
  };

  const onEnglishWordMouseDown = (word: string) => {
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
      ...matchedWords.filter((x: MatchedWord) => {
        console.log(x.frenchWord);
        console.log(x.frenchWord == word);
        return x.frenchWord != word;
      }),
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
          {' '}
          {word}
        </div>
      );
    });
  };

  return (
    <>
      <div>
        Cascade Memory Game {selectedEnglishWord} {selectedFrenchWord}
      </div>
      {matchedWordList()}
      {DisplayedScore()}
      <div onClick={() => buttonAction()}>{buttonText()}</div>
      {EnlishWordList()}
      {FrenchWordList()}
    </>
  );
}
