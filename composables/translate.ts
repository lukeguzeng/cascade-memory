import { EnglishWord, FrenchWord, TranslationMap } from '@/constants/constants';

export const translate = (
  engishWord: EnglishWord,
  frenchWord: FrenchWord
): boolean => {
  return TranslationMap.get(engishWord) == frenchWord;
};
