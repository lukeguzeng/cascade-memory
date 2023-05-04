import { EnglishWord, FrenchWord } from "@/constants/constants"
import { shuffle } from "./shuffle"

export const getShuffledEnglishWords = () => {
    return shuffle(Object.values(EnglishWord).map((x) => x))
}

export const getShuffledFrenchWords = () => {
    return shuffle(Object.values(FrenchWord).map((x) => x))
}