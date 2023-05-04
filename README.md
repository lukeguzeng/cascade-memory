### Start Commands:

```
$ docker build -t cascade-memory .
$ docker run -p 3000:3000 cascade-memory
```

### Live Demo

[Cascade Memory Demo](https://cascade-memory-lukeguzeng.vercel.app/) (host on vercel.com)

### Dev Note

1. Tech Stacks: Next, TypeScript, Tailwind CSS
1. Purpose: Build functional components to complete require features:
   1. One English word get to match and one French word, vice versa.
   2. User can grade their score by clicking 'Grade' button.
1. User interaction: drag line is not implemented due to limited time, while selected UI is being highlighted with all matched word pairs displayed.

Main component(s):

1. Casade Memory Game Component:
   1. Main function: startGame
   2. Main events: onButtonClick, onEnglishWordMouseDown, onFrenchWordMouseUp

Main static functions:

1. grade: grade score after matching
2. shuffle: shuffle words
3. translate: translate English word into French one
4. getShuffledEnglishWords
5. getShuffledFrenchWords

Main constants: EnglishWord, FrenchWord, TranslationMap
