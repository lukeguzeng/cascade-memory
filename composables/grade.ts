import { MatchedWord } from '@/type';
import { translate } from './translate';

export const grade = (matchedWords: MatchedWord[]): number => {
  return matchedWords.reduce((score, currentValue) => {
    if (translate(currentValue.englishWord) == currentValue.frenchWord) {
      return score + 10;
    }
    return score;
  }, 0);
};
