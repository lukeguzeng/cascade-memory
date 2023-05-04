export enum GameState {
  Ready,
  InGame,
}

export const InitailScore: number = -1;

export enum EnglishWord {
  forest = `forest`,
  sibling = `sibling`,
  cereal = `cereal`,
  desk = `desk`,
  camel = `camel`,
  butter = `butter`,
  bicycle = `bicycle`,
  railroad = `railroad`,
  folder = `folder`,
  weekly = `weekly`,
  hungry = `hungry`,
  limestone = `limestone`,
}

export enum FrenchWord {
  forest = `forêt`,
  sibling = `frère et sœur`,
  cereal = `céréale`,
  desk = `bureau`,
  camel = `chameau`,
  butter = `beurre`,
  bicycle = `vélo`,
  railroad = `chemin de fer`,
  folder = `dossier`,
  weekly = `hebdomadaire`,
  hungry = `faim`,
  limestone = `calcaire`,
}

export const TranslationMap = new Map<string, string>([
  [EnglishWord.forest, FrenchWord.forest],
  [EnglishWord.sibling, FrenchWord.sibling],
  [EnglishWord.cereal, FrenchWord.cereal],
  [EnglishWord.desk, FrenchWord.desk],
  [EnglishWord.camel, FrenchWord.camel],
  [EnglishWord.butter, FrenchWord.butter],
  [EnglishWord.bicycle, FrenchWord.bicycle],
  [EnglishWord.railroad, FrenchWord.railroad],
  [EnglishWord.folder, FrenchWord.folder],
  [EnglishWord.weekly, FrenchWord.weekly],
  [EnglishWord.hungry, FrenchWord.hungry],
  [EnglishWord.limestone, FrenchWord.limestone],
]);
