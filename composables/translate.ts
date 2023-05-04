import { EnglishWord, FrenchWord, TranslationMap } from '@/constants/constants';

export const translate = (
  engishWord: string,
): string => {
  return TranslationMap.get(engishWord)!;
};
