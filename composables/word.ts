import { EnglishWord } from "@/constants/constants"
import { shuffle } from "./shuffle"

export const getShuffledEnglishWords = () => {
    return shuffle(Object.keys(EnglishWord).map((x) => x))
}

export const getShuffledFrenchWords = () => {
    return shuffle(Object.keys(EnglishWord).map((x) => x))
}